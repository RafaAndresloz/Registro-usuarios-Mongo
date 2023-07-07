const express = require("express");
const jwt = require('jsonwebtoken');
const Request = require("../model/querysRequest");
const Database = require("../conections/database");

const requestInstance = new Request();

const db = new Database("localhost", "root", "", "usuarios");
const sqlQuerys = requestInstance.getQuerys();

function generarToken(usuario) {
  const payload = {
    id: usuario.id,
    // Otros datos que desees incluir en el token
  };

  // Genera el token con el payload y una clave secreta
  const token = jwt.sign(payload, 'clave_secreta');

  return token;
}

async function validarUsuarios(datos, res) {
  try {
    const connection = db.getConnection();
    const values = [datos.email, datos.password];
    const sql = sqlQuerys.getUser;

    const result = await new Promise((resolve, reject) => {
      connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(results);
      });
    });

    if (result.length > 0) {
      const token = generarToken(result[0]); // Pasar el usuario encontrado como argumento
      return res.json({ token });
    } else {
      console.log('El usuario no existe en la base de datos.');
      res.json("Usuario no existe");
    }

    connection.end();
  } catch (error) {
    console.error('Error en la validación de usuarios:', error);
    res.status(500).send("Error en el servidor");
  }
}

module.exports = {
  validarUsuarios: validarUsuarios,
};