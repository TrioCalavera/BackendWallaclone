var express = require('express');
const createError = require('http-errors');
var router = express.Router();

const User = require('../../models/User')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  try{
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
  }catch(err){
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
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

module.exports = router;
