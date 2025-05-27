const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

});

connection.connect((err) =>{
    if (err) throw err;
    console.log('Conectado a Mysql')
});

module.exports= connection;