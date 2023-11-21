// write a mongo-insert script to insert the collections into the database
/*{
    "_id" : "3zZtff2wdbwqL8z5N",
    "createdAt" : ISODate("2023-01-23T23:10:35.226+0000"),
    "services" : {
        "password" : {
            "bcrypt" : "$2b$10$1caNPZLRPldOP.io33euJ.AMUgA142okiyVkxclO5V7nvvj2ZvDZ6"
        },
        "resume" : {
            "loginTokens" : [

            ]
        }
    },
    "username" : "walter",
    "status" : "active",
    "emails" : [
        {
            "address" : "johan@tritonite.se",
            "verified" : true
        }
    ],
    "uid" : "333",
    "language" : "sv"
}
{
    "_id" : "fg9LPNRcBaou5mg4T",
    "createdAt" : ISODate("2023-03-19T15:23:06.876+0000"),
    "services" : {
        "password" : {
            "bcrypt" : "$2b$10$NX4vXF40TOzemlYsOWqZLeM8xgM8y4nuKDa76MfhiuLCyxDDJPJVS"
        },
        "resume" : {
            "loginTokens" : [
                {
                    "when" : ISODate("2023-03-19T15:23:07.180+0000"),
                    "hashedToken" : "ekPFb+aNT0a05ea47xnQymb5vvr0w33g28Yr2Dvl9Oo="
                }
            ]
        }
    },
    "username" : "enkey",
    "status" : "active",
    "emails" : [
        {
            "address" : "doowhsalf@mac.com",
            "verified" : true
        }
    ],
    "uid" : "337",
    "heartbeat" : ISODate("2023-03-19T15:23:19.641+0000")
}

*/
// create an insert script for the the collection agent_user_connection and insert a connection link to the agent for the users with the following json structure:
/* {
    "_id" : "3zZtff2wdbwqL8z5N",
    "createdAt" : ISODate("2023-01-23T23:10:35.226+0000"),
    "services" : {
        "password" : {
            "bcrypt" : "$2b$10$1caNPZLRPldOP.io33euJ.AMUgA142okiyVkxclO5V7nvvj2ZvDZ6"
        },
        "resume" : {
            "loginTokens" : [

            ]
        }
    },
    "username" : "walter",
    "status" : "active",
    "emails" : [
        {
            "address" : "johan@tritonite.se",
            "verified" : true
        }
    ],
    "uid" : "333",
    "language" : "sv"
}
{
    "_id" : "fg9LPNRcBaou5mg4T",
    "createdAt" : ISODate("2023-03-19T15:23:06.876+0000"),
    "services" : {
        "password" : {
            "bcrypt" : "$2b$10$NX4vXF40TOzemlYsOWqZLeM8xgM8y4nuKDa76MfhiuLCyxDDJPJVS"
        },
        "resume" : {
            "loginTokens" : [
                {
                    "when" : ISODate("2023-03-19T15:23:07.180+0000"),
                    "hashedToken" : "ekPFb+aNT0a05ea47xnQymb5vvr0w33g28Yr2Dvl9Oo="
                }
            ]
        }
    },
    "username" : "enkey",
    "status" : "active",
    "emails" : [
        {
            "address" : "doowhsalf@mac.com",
            "verified" : true
        }
    ],
    "uid" : "337",
    "heartbeat" : ISODate("2023-03-19T15:23:19.641+0000")
}
*/
// make the insert statement on the data above
