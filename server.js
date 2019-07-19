const express = require('express');

const ProjectRouter = require('./routes/project-routes.js');
const ActionRouter = require('./routes/action-routes.js');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectRouter);
server.use('/api/actions', ActionRouter);

module.exports = server;