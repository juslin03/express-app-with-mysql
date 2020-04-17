let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "juslin",
    database: "livreor"
});

connection.connect();

module.exports = connection;