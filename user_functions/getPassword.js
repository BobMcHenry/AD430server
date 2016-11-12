module.exports = function() { 
	this.getPassword = function (userId, callback) {
		//Check your input is not null
		if(userId == undefined)
		{
			callback({ "success": false, "message": "userId was not supplied, but is required" });
			return;
		}
		
		//Get and start SQL Connection
		var con = getConnection();
		con.connect();
	
		//Check your input is valid with the DB
		con.query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ?',userId ,function(err,rows){
	
			//Check Hoh user id is valid
			if(rows[0].isGood == 0)
			{
				con.end();
				callback({ "success": false, "message": "Given userId cannot be found." });
				return;
			} else {
				con.query('SELECT hashed_password FROM user WHERE user_id = ?',userId ,function(err,rows){
					if (err) throw err;

				con.end();
				callback(rows[0].hashed_password);
			});
			}
		});
	};
}