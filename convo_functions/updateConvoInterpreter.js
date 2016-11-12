//Update the last ping time for an convo with the interpreter User4
module.exports = function() { 
	this.updateConvoInterpreter = function (interpreterUserId, ConvoId, callback)
	{
		//Check your input is not null
		if(interpreterUserId == undefined)
		{
			callback({ "success": false, "message": "interpreterUserId was not supplied, but is required" });
			return;
		}
		if(ConvoId == undefined)
		{
			callback({ "success": false, "message": "ConvoId was not supplied, but is required" });
			return;
		}

		//Get and start SQL Connection
		var con = getConnection();
		con.connect();

		//Check your input is valid with the DB
		con.query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ? AND is_interpreter = 1', interpreterUserId, function(err,rows){
			//Check interpreterUserId user id is valid
			if(rows[0].isGood == 0)
			{
				con.end();
				callback({ "success": false, "message": "Given interpreterUserId cannot be found or is not a interpreter user." });
				return;
			} else {
				con.query('SELECT COUNT(*) AS isGood FROM convo WHERE convo_id = ? AND interpreter_user_id = ?', [ConvoId, interpreterUserId] , function(err,rows){

					//Check interpreter user id is valid
					if(rows[0].isGood == 0)
					{
						con.end();
						callback({ "success": false, "message": "Given ConvoId cannot be found or did not belong to the given interpreter user." });
						return;
					} else {
						con.query('UPDATE convo SET last_updated_hoh = NOW() WHERE convo_id = ?', ConvoId, function(err,res){
							if(err) {
								callback({ "success": false, "message": "something went wrong in the db." });
							}
							console.log(err);
							console.log(res);
							callback({ "success": true, "convo_id": ConvoId });
							return;
						});
					}
				});
			}
		});
	};
}