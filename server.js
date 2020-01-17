const express = require('express');
const projectRouter = require('./data/routers/projectRouters')
const actionRouter = require('./data/routers/actionRouters')
const server = express();
server.use(express.json())
server.use(logger)
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
