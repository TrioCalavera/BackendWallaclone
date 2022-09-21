var express = require("express");
const createError = require("http-errors");
var router = express.Router();

const Tag = require("../../../models/Tag");

// Traernos nuestro array de tags de Anuncios
router.get("/", async (req, res, next) => {
    try {
      const tags = await Tag.getList();
      const tagsDto= [];

      for (let index = 0; index < tags.length; index++) {
        const element = tags[index];
        tagsDto[index] = {
          name : element.name,
          icon : element.icon,
        }
      }

      res.status(200).json(tagsDto);
    } catch (error) {
      next(createError(
        400,
        "The server cannot or will not process the request due to something that is perceived to be a client error."
      ));
    }
  });

  module.exports = router;
