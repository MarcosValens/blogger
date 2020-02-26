let mysql = require('mysql');
const mysqlHost:string = process.env.MYSQL_HOST;
const mysqlUser:string = process.env.MYSQL_USER;
const mysqlPassword:string = process.env.MYSQL_PASSWORD;
var con = mysql.createConnection({
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlPassword
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

/*
return new Promise((resolve, reject) => {
    connection.query(query, (error, data) => {
        if (error) return reject(error);
        resolve(data);
    })
});*/
