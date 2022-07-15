var express = require("express");
const createError = require("http-errors");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const { body, validationResult} = require("express-validator");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const email = req.query.email;
    const name = req.query.name;
    const password = req.query.password;
    const role = req.query.role;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;

    const filters = {};

    if (email) {
      filters.email = email;
    }
    if (name) {
      filters.name = name;
    }
    if (password) {
      filters.password = password;
    }
    if (role) {
      filters.role = role;
    }
    const users = await User.getList(filters, skip, limit, select, sort);

    res.status(200).json({ results: users });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });

    if (!user) {
      next(createError(404));
      return;
    }

    res.json({ result: user });
  } catch (err) {
    next(err);
  }
});

router.post("/",body('email').isEmail(),body('password').isLength({ min: 3 }),body('name').isLength({ min: 3 }), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;

    req.body.password =  await User.hashPassword(req.body.password)

    const email = req.body.email;
   
    const user = new User(userData);

    const newUser = await user.save();

    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return next(err);
        }
        // respondemos con un JWT
        res.status(201).json({ result: newUser, ok: true, token: token });
      }
    );
  } catch (err) {
    next(err);
  }
});

// DELETE /users/:id
// Elimina un usuario
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    
    if (!user) {
      // Respondemos que no son validas las credenciales
      res.status(404).json({ok: false, error: 'User does not exists'})
      return
    }
    await User.deleteOne(user)
    res.status(200).send("User deleted successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
