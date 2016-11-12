module.exports = function() { 
	this.getUser = function (userId, callback) {
		console.log("getUser Started");
		var result;
		var con = getConnection();
		con.connect();
		con.query('SELECT * FROM user WHERE user_id = ?', userId, function(err,rows){
			if (err) throw err;

			con.end();
			console.log("to Preform Callback");
			callback(rows);
		});
	};
}