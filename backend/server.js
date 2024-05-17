// I chose Express.js framework for this task as it is lightweight and minimalist
// For JSON-RPC API over HTTP, Express provides a straightforward way to define routes and handle incoming requests
// Documentation: https://expressjs.com/ 
const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { JSONRPCServer } = require('json-rpc-2.0');
// Importing the cors middleware, which is used to enable CORS in the Express.js application
// Documentation: https://expressjs.com/en/resources/middleware/cors.html
const cors = require('cors'); 

// Creating an instance of the Express application
const app = express();
// Telling the Express app to use the bodyParser middleware for parsing JSON request bodies
app.use(bodyParser.json());
app.use(cors()); // I had the problem with communicating with the server, this was the solution

// Creating an instance of the JSON-RPC server
const rpcServer = new JSONRPCServer();

let counter = 5; // Initial counter value when connected to the server

rpcServer.addMethod('get_count', () => {
    return counter;
});

rpcServer.addMethod('increment', () => {
    counter++;
    return counter;
});

rpcServer.addMethod('decrement', () => {
    counter--;
    return counter;
});

// Defines a route handler for POST requests to the /rpc endpoint
app.post('/rpc', (req, res) => {
    rpcServer.receive(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Creating an HTTP server using the Express app
const server = createServer(app);

// Defining the port number
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});