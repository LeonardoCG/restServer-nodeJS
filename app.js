require('dotenv').config(); // configuracion de variables de entorno
const Server = require('./models/server');

const server = new Server();

server.listen();