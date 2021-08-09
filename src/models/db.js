const mysql = require('mysql');
const dbConfig = require('../config/db');
//max_allowed_packet = 268435456

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT,
});

//open MYSQL Connection
connection.connect(error => {
    if(error) throw error;
    console.log("Successfully connected to the database...");
});

module.exports = connection;