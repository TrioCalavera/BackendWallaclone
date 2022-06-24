'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.log('Connection Error to MongoDB', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Connection with MongoDB Succesfully:', mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

// opcional
module.exports = mongoose.connection;