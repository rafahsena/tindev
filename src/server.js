const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/routes');

const server = express();

mongoose.connect('mongodb+srv://rafahsena:senha@cluster0-f8oqu.mongodb.net/test?retryWrites=true&w=majority', { 
  useNewUrlParser: true 
});

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(3000);