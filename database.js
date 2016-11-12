var mysql = require("mysql");

module.exports = function() { 
	//Replace with relevant creds
	this.getConnection = function () {
		var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "root",
			database: "ad430_db"
		});
		return con;
	};
}