# AD430server
There are several different requests which may be made of the server to return json data.

<<<<<<< HEAD
createConvo: is used to make a new record in the DB for a conversation. It accepts two arguments, the ID of the hard-of-hearing user (hohUserId), and the ID of the interpreter(interpreterUserId).  
Example: http://54.69.18.19/createConvo?hohUserId=1&interpreterUserId=5

endConvo: sets the end of the conversation record. It accepts a single argument, the ID of the conversation (ConvoId).  
Example: http://54.69.18.19/endConvo?ConvoId=9

getConvos: returns a list of all of the conversation records.  
Example: http://54.69.18.19/getConvos

getPassword: gets the current password for a particular user. It accepts a single argument, the ID of the user (userId).  
Example: http://54.69.18.19/getPassword?userId=2

getUser: returns the data about a particular user. It accepts a single argument, the ID of the user (userId).  
Example: http://54.69.18.19/getUser?userId=2

getUserLocation: Get the user location for the given id  
Example: http://54.69.18.19/getUserLocation?userId=1

setInterpreterStatus switches a user from a HOH user to an interpreter and back again. It accepts two arguments,the ID of the user (userId), and the status of the user (status). Set status to 1 if the user is an interpreter and 0 if the user is not an interpreter.  
Example:

setPassword: sets the current password for a particular user. It accepts a two arguments, the ID of the user (userId), and the new password   (newPassword)  
Example: http://54.69.18.19/setPassword?userId=2&newPassword=hashedpasswordtemp

setSkypeName: sets the skype name for a particular user.  Acceps two arguments, the ID of the user (userId), and the new skype name (skypeName)  
Example: http://54.69.18.19/setSkypeName?userId=1&skypeName=PizzaIsFantastic88

updateConvoHOH: gets data about the conversations. It accepts two arguments, the ID of the hard-of-hearing user and the ID of the conversation.  
Example: http://54.69.18.19/updateConvoHOH?hohUserId=1&ConvoId=9

updateConvoInterpreter: returns data about the itepreter conversations. It accepts two arguments, interpreterUserId and ConvoId.  
Example: http://54.69.18.19/updateConvoInterpreter?interpreterUserId=11&ConvoId=9

updateUserLastActive: Updates the last active time for a user to NOW. Accepts one argument, the id of the user (userId)  
Example: http://54.69.18.19/updateUserLastActive?userId=1

updateUserLocation: Update the user location (lat, long) and update time for the given id  
Example: http://54.69.18.19/updateUserLocation?userId=1&userLocLat=69&userLocLong=96
=======
createConvo: is used to make a new record in the DB for a conversation. It accepts two arguments, the ID of the hard-of-hearing user (hohUserId), and the ID of the interpreter(interpreterUserId).
Example: http://54.69.18.19/createConvo?hohUserId=1&interpreterUserId=5

endConvo: sets the end of the conversation record. It accepts a single argument, the ID of the conversation (ConvoId).
Example: http://54.69.18.19/endConvo?ConvoId=9

getConvos: returns a list of all of the conversation records.
Example: http://54.69.18.19/getConvos

getPassword: gets the current password for a particular user. It accepts a single argument, the ID of the user (userId).
Example: http://54.69.18.19/getPassword?userId=2

getUser: returns the data about a particular user. It accepts a single argument, the ID of the user (userId).
Example: http://54.69.18.19/getUser?userId=2

getUserLocation: Get the user location for the given id
Example: http://54.69.18.19/getUserLocation?userId=1

setInterpreterStatus switches a user from a HOH user to an interpreter and back again. It accepts two arguments,the ID of the user (userId), and the status of the user (status). Set status to 1 if the user is an interpreter and 0 if the user is not an interpreter.
Example:

setPassword: sets the current password for a particular user. It accepts a two arguments, the ID of the user (userId), and the new password   (newPassword)
Example: http://54.69.18.19/getPassword?userId=2&newPassword=hashedpasswordtemp

updateConvoHOH: gets data about the conversations. It accepts two arguments, the ID of the hard-of-hearing user and the ID of the conversation.
Example: http://54.69.18.19/updateConvoHOH?hohUserId=1&ConvoId=9

updateConvoInterpreter: returns data about the itepreter conversations. It accepts two arguments, interpreterUserId and ConvoId.
Example: http://54.69.18.19/updateConvoInterpreter?interpreterUserId=11&ConvoId=9

updateUserLocation: Update the user location (lat, long) and update time for the given id
Example: http://54.69.18.19/updateUserLocation?userId=1&userLocLat=69&userLocLong=96

>>>>>>> master
