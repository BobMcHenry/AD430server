module.exports = function() { 
	this.setPassword = function (userId, newPassword, callback) {
		//Check your input is not null
		if(userId == undefined)
		{
			callback({ "success": false, "message": "userId was not supplied, but is required" });
			return;
		}
		
		if(newPassword == undefined)
		{
			callback({ "success": false, "message": "newPassword was not supplied, but is required" });
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
				con.query('UPDATE user SET hashed_password = ? WHERE user_id = ?', [newPassword,userId], function(err,res){
					if(err) {
						callback({ "success": false, "message": "something went wrong in the db." });
					}
					console.log(err);
					console.log(res);
					callback({ "success": true, "user_id": userId });
					return;
				});
			}
		});
	};
}