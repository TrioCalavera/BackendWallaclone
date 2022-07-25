"use strict";

require("dotenv").config();
const fsPromise = require("fs/promises");
const readline = require("readline");

const dbConnection = require("./lib/connectMongoose");

const User = require("./models/User");
const Tag = require("./models/Tag");
const Adverts = require("./models/Advert");

dbConnection.once("open", () => {
  main().catch((err) => console.log("Hubo un error", err));
});

async function main() {
  const respQuestion = await question(
    "Estas seguro de que quieres borrar la base de datos? (si/no)"
  );
  if (!respQuestion) {
    process.exit(0);
  }

  // inicializar usuarios
  await initUsers();

  // inicializar tags
  await initTags();

  // inicializar articulos
  await initAdverts();

  // desconectar la base de datos
  dbConnection.close();
}

async function initUsers() {
  // borrar los usuarios existentes
  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios
  const usuarios = await User.insertMany([
    {
      email: "user1@wallaclone.es",
      name: "user1",
      password: await User.hashPassword("1234"),
      role: "admin",
    },
    {
      email: "user2@wallaclone.es",
      name: "user2",
      password: await User.hashPassword("1234"),
      role: "user",
    },
  ]);
  console.log(`Creados ${usuarios.length} usuarios.`);
}

//crear tags
async function initTags() {
  // borrar los tags existentes
  const deleted = await Tag.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} tags.`);

  const tags = await Tag.insertMany([
    { name: "work", icon: "fa fa-briefcase" },
    { name: "lifestyle", icon: "fa fa-heart" },
    { name: "mobile", icon: "fa fa-mobile" },
    { name: "motor", icon: "fa fa-car" },
    { name: "it", icon: "fa fa-coffee" },
  ]);
  console.log(`Creados ${tags.length} tags.`);
}

// crear anuncios
async function initAdverts() {
  // borrar todos los articulos que haya en la colección
  const deleted = await Adverts.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} articulos.`);

  const data = await fsPromise.readFile("adverts.json", "utf-8");
  const articuloData = JSON.parse(data);

  // crear articulos iniciales
  // const articulos = await Adverts.insertMany(articuloData);
  // console.log(`Creados ${articulos.length} articulos.`);
}

function question(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline a la consola
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // hacemos pregunta
    rl.question(texto, (respuesta) => {
      rl.close();
      if (respuesta.toLowerCase() === "si") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
