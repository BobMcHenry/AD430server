//Update the convo to be over according to the db
module.exports = function() { 
	this.endConvo = function (ConvoId, callback)
	{
		if(ConvoId == undefined)
		{
			callback({ "success": false, "message": "ConvoId was not supplied, but is required" });
			return;
		}
	
		//Get and start SQL Connection
		var con = getConnection();
		con.connect();
	
		//Check your input is valid with the DB
		con.query('SELECT COUNT(*) AS isGood FROM convo WHERE convo_id = ? ', ConvoId , function(err,rows){
	
			//Check interpreter user id is valid
			if(rows[0].isGood == 0)
			{
				con.end();
				callback({ "success": false, "message": "Given ConvoId cannot be found." });
				return;
			} else {
				con.query('UPDATE convo SET end_time = NOW() WHERE convo_id = ?', ConvoId, function(err,res){
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
	};
}