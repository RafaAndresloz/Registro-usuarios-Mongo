

const bcrypt = require('bcrypt');
const Database = require('../conections/database');
const Request = require("../model/querysRequest");

const db = new Database('localhost', 'root', '', 'usuarios');

const requestInstance = new Request();
const sqlQuerys = requestInstance.getQuerys();

function guardarUsuario(datos) {
  return new Promise(function(resolve, reject) {
    const connection = db.getConnection();
    const sql = sqlQuerys.insertUser;


    bcrypt.hash(datos.password, 12, function(err, hashedPassword) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, [datos.usuario, datos.email, hashedPassword], function(error, resultado) {
          if (error) {
            reject(error);
          } else {
            resolve(resultado);
          }
        });
      }
    });
  });
}

module.exports = {
  guardarUsuario: guardarUsuario
};


