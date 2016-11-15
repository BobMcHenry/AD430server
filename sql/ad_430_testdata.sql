USE ad430_db;

INSERT INTO user(
    skype_username,
	full_name,
    email,
    is_interpreter,
    ok_to_chat, 
    ok_to_show_location,
    last_known_location_lat, 
    last_known_location_long,
    hashed_password
)VALUES
 ("skypeUN01", "Casey D Riggin", "fakeemail01@gmail.com", 0, 1, 1, 47.6080, -122.3351, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 ("skypeUN02", NULL, "fakeemail02@gmail.com", 0, 1, 1, 47.6080, -122.3351, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 ("skypeUN03", "Lizzy Sizer", "fakeemail03@gmail.com", 1, 0, 1, 47.6080, -122.3351, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 ("skypeUN04", NULL, "fakeemail04@gmail.com", 1, 0, 1, 47.6080, -122.3351, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 
 ("skypeUN05", "Maria Alburta", "fakeemail05@gmail.com", 0, 1, 0, 47.2528, -122.4442, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 ("skypeUN06", "Douglas Riggin", "fakeemail06@gmail.com", 0, 1, 0, 47.2528, -122.4442, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 ("skypeUN07", NULL, "fakeemail07@gmail.com", 1, 0, 0, 47.2528, -122.4442, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 ("skypeUN08", NULL,"fakeemail08@gmail.com", 1, 0, 0, 47.2528, -122.4442, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 
 ("skypeUN09", NULL, "fakeemail09@gmail.com", 0, 1, 1, 47.6080, -122.3351, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 ("skypeUN10", NULL, "fakeemail10@gmail.com", 0, 1, 1, 47.6080, -122.3351, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 ("skypeUN11", NULL, "fakeemail11@gmail.com", 1, 1, 1, 47.6080, -122.3351, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash"),
 ("skypeUN12", "Fake Full Name", "fakeemail12@gmail.com", 1, 1, 1, 47.6080, -122.3351, "invalidpasswordhashinvalidpasswordhashinvalidpasswordhashinvalidpasswordhash")
;

INSERT INTO user_report(
	
    creating_user_id, #not null
    blocking_user_id,#not null
    
    creation_timestamp,
    
    was_reported,#not null
    reporting_user_comment
    
) VALUES
( 1, 2, NOW(), 0, "comments"),
( 1, 3, NOW(), 1, "comments"),
( 3, 2, NOW(), 0, "comments"),
( 3, 1, NOW(), 1, "comments"),
( 3, 3, NOW(), 0, "comments")

;

INSERT INTO convo(
	
   
    hoh_user_id,
    start_time,
    interpreter_user_id,
    last_updated_hoh,
    last_updated_interpreter
    
    
) VALUES
( 1, NOW(), 2, NOW(), NOW()  ),
( 1, NOW(), 3, NOW(), NOW() ),
( 4, NOW(), 6, NOW(), NOW()  ),
( 5, NOW(), 7, NOW(), NOW()  ),
( 8, NOW(), 10, NOW(), NOW()  ),
( 9, NOW(), 11, NOW(), NOW()  )

;INSERT INTO convo_rating(
	convo_id, 
    asl_skill, 
    translate_speed,
    friendliness 
    
) VALUES
(1, 5, 5, 5)

;
