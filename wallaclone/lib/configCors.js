require("dotenv").config();

const config = {
  application: {
    cors: {
      server: [
        {
          // origin: "http://44.205.179.117", //servidor que deseas que consuma o (*) en caso que sea acceso libre
          origin: process.env.CONFIG_CORS || "localhost:3000",
          credentials: true,
        },
      ],
    },
  },
};

module.exports = config;
