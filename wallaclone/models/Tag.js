"use strict";

const mongoose = require("mongoose");

const tagsSchema = mongoose.Schema(
    {
      name: { type: String, index: true },
      icon: { type: String, index: true },  
    },
    {}
  );

  // tags permitidos
  tagsSchema.statics.getList = function () {
    return Tag.find().exec();
  };

  const Tag = mongoose.model('Tag', tagsSchema);

module.exports = Tag;