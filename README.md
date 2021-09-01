# Bank Account Management(Backend)

A quick express application for the interview.

## Interviewee
Caleb Liu

## File Sturcture
```
├── controller                   // Include all the endpoints and graphql resolver
│	  ├── bankAccountController.js // Resolvers to interact with back account
│	  └── userController.js        // Endpoints and resolvers to interact with users
│
├── model                        // Include all the database schemas
│   ├── BankAccount.js           // schema for the bank collection
│	  └── User.js                  // schema for the user collection
│
│── node_modules                 // All 3rd party modules
│
├── Serves                       // All Serves
│	  └── auth.js                  // Authentication functions 	
│
├── .env                         // Contained defined environment variables
│
├── api.js                       // The entry file init express server
│
├── bank.postman_collection.json // The exported postman collection
│
├── config.js                    // The config file
│
├── database.js                  // Function to connect to database
│
├── graphqlSchemas.js            // Include all graphql schemas
│
└── package.json                 // Includes npm commands and libraries versions

```

## Instructions
1. open the project directory
2. run "npm install"
3. run "npm start" to start the server
4. Use the postman to interact with

