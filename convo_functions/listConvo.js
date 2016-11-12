module.exports = function() { 
	this.getAllConvos = function (callback) {
		var result;
		var con = getConnection();
		con.connect();
		con.query('SELECT * FROM convo',function(err,rows){
			if (err) throw err;

			con.end();
			callback(rows);
		});
	};
}