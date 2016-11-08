# AD430server
There are several different requests which may be made of the server to return json data.

createConvo is used to make a new record in the DB for a conversation. It accepts two arguments, the ID of the hard-of-hearing
user (hohUserId), and the ID of the interpreter(interpreterUserId). NOTE: DO NOT PASS AN ARGUMENT TO interpreterUserId Example:
http://54.69.18.19/createConvo?hohUserId=1

listConvo returns a list of all of the conversation records. Example: http://54.69.18.19/listConvo

updateConvoHOH gets data about the conversations. It accepts two arguments, the ID of the hard-of-hearing user and the ID of
the conversation. Example: http://54.69.18.19/pingConvoHOH?hohUserId=1&ConvoId=9

pingConvoInterpreter returns data about the itepreter conversations. It accepts two arguments, interpreterUserId and ConvoId.
Example: http://54.69.18.19/pingConvoInterpreter?interpreterUserId=11&ConvoId=9

endConvo sets the end of the conversation record. It accepts a single argument, the ID of the conversation (ConvoId).
Example: http://54.69.18.19/endConvo?ConvoId=9

listUser returns the data about a particular user. It accepts a single argument, the ID of the user (userId).
Example: http://54.69.18.19/listUser?userId=2
