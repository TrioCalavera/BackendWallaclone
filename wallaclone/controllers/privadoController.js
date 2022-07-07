const { User } = require('../models')

class PrivadoController {

  async index(req, res, next) {
    try {
      const userId = req.session.userLogged._id

      const user = await User.findById(userId)

      if (!user) {
        next(new Error('Usuario no encontrado'));
        return;
      }

      res.render('privado', { email: user.email });
    } catch (err) {
      next(err)
      return;
    }
  }

}

module.exports = PrivadoController