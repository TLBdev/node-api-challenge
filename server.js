const express = require('express');
const projectRouter = require('./data/routers/projectRouters')
const actionRouter = require('./data/routers/actionRouters')
const server = express();
server.use(express.json())
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.get('/', (req, res) => {
    res.send(`<h2>Server Mounted</h2>`);
});
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


function logger(req, res, next) {
    console.log(req.method)
    next()
}

module.exports = server;
