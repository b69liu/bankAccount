const express = require('express');
const helmet =require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDatabase = require('./database');
const {schema} = require('./graphqlSchemas');
const {authMiddleware} = require('./services/auth');
const {signIn, signUp} = require('./controller/userController');
const {graphqlHTTP} = require("express-graphql");



require("dotenv").config();

connectDatabase();


const {PORT} = require('./config');

const app = express();

// use default helmet config
app.use(helmet());

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



app.get('/test', (req, res) => {
  res.send('Hello World!');
})


// the rigister and login endpoints do not need to be combined with other requests
// so it is placed outside the graphql request, as traditional restful request
app.use("/sign_in", signIn);
app.use("/sign_up", signUp);

// check jwt for all graphql requests and add userId
app.use(["/graphql"], authMiddleware);

/**
 * 
 * Endpint for graphQL. Refer the Schema docs(not done yet).
 * 
 * @name Graphql
 * @path {POST} /graphql
 * @header {String} authorization requires access token.
 * @body {String} query is the graphQL query.
 * @body {Object} variables is the variable used in query.
 * @code {200} if the request receive, but may not success.
 * @code {401} if the token is invalid.
 * @response {Object} what requested by the query or syntax error info.
 */
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        // rootValue: root,
        graphiql: true     // should be disabled in production env
    })
);
  



app.listen(PORT, () => {
  console.log(`Server listening at port:${PORT}`)
})