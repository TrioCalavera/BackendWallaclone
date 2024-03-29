var express = require("express");
const createError = require("http-errors");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");

const {validationResult} = require("express-validator");
const formValidation = require('../../../lib/formValidation')
const jwtAuth = require("../../../lib/jwtAuth");


/* GET users listing. */
router.get("/",jwtAuth(), async (req, res, next) => {
  try {

    const user = await User.findById(req.userId);

    if (user.role !== "admin"){
      res.status(403).json({ result: "You has no permission." , ok: true });
      return;
    }
      
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

//devuelvo el usuario q esta haciendo la peticion
router.get("/me", jwtAuth(), async(req,res,next)=>{
  try {  
    const user = await User.findById(req.userId).exec();

    if (!user) {
      next(createError(404));
      return;
    }
    res.status(200)
      .json({ 
        result: 
          {email: user.email,
           name: user.name, 
           role: user.role,
           _id: user._id} 
          });
  } catch (error) {
    next(error);
  }
})


router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });

    if (!user) {
      next(createError(404));
      return;
    }

    res.json({ 
      result: 
        {
          //email: user.email,
          name: user.name, 
          role: user.role,
          _id: user._id
        } 
        });
  } catch (err) {
    next(err);
  }
});

router.post("/", formValidation.createUserValidator(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body.password =  await User.hashPassword(req.body.password)

    const email = req.body.email;
    const userData = req.body;

    //Buscamos el usuario
    const searchUserEmail = await User.findOne({ email });
    if (searchUserEmail) {
      next(createError(404,'Exist an user with the same email.'));
      return;
    }

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
router.delete("/:id",jwtAuth(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    
    if (!user) {
      // Respondemos que no son validas las credenciales
      res.status(404).json({ok: false, error: 'User does not exists'})
      return
    }

    if(req.userId == req.params.id){
      await User.deleteOne(user)
      res.status(200).send("User deleted successfully");
    }else{
      res.status(403).json({ok: false, error: 'You has no permission.'})
      return
    }

  } catch (err) {
    next(err);
  }
});


module.exports = router;