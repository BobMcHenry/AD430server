# AD430server
There are several different requests which may be made of the server to return json data.

createConvo: is used to make a new record in the DB for a conversation. It accepts two arguments, the ID of the hard-of-hearing user (hohUserId), and the ID of the interpreter(interpreterUserId).  
Example: http://54.69.18.19/createConvo?hohUserId=1&interpreterUserId=4

createUser: Creates a user with the given args. It accepts three args, the user email, if they are an Interpreter and the hashed Password.
Example: http://54.69.18.19/createUser?userEmail=casessy.riggisn@gmail.coms&isInterpreter=1&hashedPassword=testHASH

endConvo: sets the end of the conversation record. It accepts a single argument, the ID of the conversation (ConvoId).  
Example: http://54.69.18.19/endConvo?ConvoId=9

getConvos: returns a list of all of the conversation records.  
Example: http://54.69.18.19/getConvos

getPassword: gets the current password for a particular user. Also returns the user id. It accepts a single argument, the email of the user. 
Example: http://54.69.18.19/getPassword?userEmail=casey.riggin@gmail.com

getPhysicalInterpreters: Gets a list of available physical interpreters. Takes three arguments, userId, userLat, userLong. *note: Range is not implemented server side, all available physical users returned. Expected 11/22
Example: http://54.69.18.19/getphysicalinterpreters?userId=1&userLat=40.3&userLong=-21.4

getSkypeName: gets the skype name for a particular user.  Acceps one argument, the ID of the user (userId)  
Example: http://54.69.18.19/getSkypeName?userId=1

getUser: returns the data about a particular user. It accepts a single argument, the ID of the user (userId).  
Example: http://54.69.18.19/getUser?userId=2

getUserLocation: Get the user location for the given id  
Example: http://54.69.18.19/getUserLocation?userId=1

getVideoInterpreters: Get a list of available video interpreters names and Skype IDs. Pass requesting user id. 
Example: http://54.69.18.19/getVideoInterpreters?userId=1

updateUserLocation: Update the user location (lat, long) and update time for the given id
Example: http://54.69.18.19/updateUserLocation?userId=1&userLocLat=69&userLocLong=96

setVideoStatus - sets the video status of an interpreter. this flags an interpreter as able to receive video requests or not.
Example: http://54.69.18.19/setVideoStatus?userId=1&status=0
JSON:    {"success":true,"ok_to_chat":"0"}

getVideoStatus - returns an interpreter's video status
Example: http://54.69.18.19/getVideoStatus?userId=1
JSON:    [{"ok_to_chat":{"type":"Buffer","data":[0]}}]

setLocationStatus - sets an interpreters locations status. values and enabled/disabled
Example: http://54.69.18.19/setLocationStatus?userId=1&status=1
JSON:    {"success":true,"ok_to_show_location":"1"}

getLocationStatus - gets an interpreters locations status.
Example: http://54.69.18.19/getLocationStatus?userId=1
JSON:    [{"ok_to_show_location":{"type":"Buffer","data":[1]}}]

setInterpreterStatus switches a user from a HOH user to an interpreter and back again. It accepts two arguments,the ID of the user (userId), and the status of the user (status). Set status to 1 if the user is an interpreter and 0 if the user is not an interpreter.  
Example:http://54.69.18.19/setInterpreterStatus?userId=2&status=0

setLocStatus: Changes the setting for the user to share their location with others. Accepts two arguments, the ID of the user (userId), and the location sharing status (status). Put 0 into the status to hid the user's location and 1 to share it with other users.
Example: http://54.69.18.19/setLocStatus?userId=1&status=1

setPassword: sets the current password for a particular user. It accepts a two arguments, the ID of the user (userId), and the new password   (newPassword)  
Example: http://54.69.18.19/setPassword?userId=2&newPassword=hashedpasswordtemp

setSkypeName: sets the skype name for a particular user.  Acceps two arguments, the ID of the user (userId), and the new skype name (skypeName)  
Example: http://54.69.18.19/setSkypeName?userId=1&skypeName=PizzaIsFantastic88

setUserName: Sets the user name of the user. Takes two arguments, the id of the user (userId) and the new name of the user (fullName).
Example: http://54.69.18.19/setUserName?userId=1&fullName=Name

updateConvoHOH: gets data about the conversations. It accepts two arguments, the ID of the hard-of-hearing user and the ID of the conversation.  
Example: http://54.69.18.19/updateConvoHOH?hohUserId=1&ConvoId=9

updateConvoInterpreter: returns data about the itepreter conversations. It accepts two arguments, interpreterUserId and ConvoId.  
Example: http://54.69.18.19/updateConvoInterpreter?interpreterUserId=11&ConvoId=9

updateUserLastActive: Updates the last active time for a user to NOW. Accepts one argument, the id of the user (userId)  
Example: http://54.69.18.19/updateUserLastActive?userId=1

updateUserLocation: Update the user location (lat, long) and update time for the given id  
Example: http://54.69.18.19/updateUserLocation?userId=1&userLocLat=69&userLocLong=96

