const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

//Servidor
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        
        //Database conection
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        //rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }



    //Servidor estatico 
    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json() ); //info res se intentará serializarce a formato JSON

        // directorio publico
        this.app.use( express.static('public') );
    }

    routes() {

        //middleware condicional
        this.app.use(this.usersPath, require('../routes/user'));
       
    }


    //para rutas no existentes
    // sendFile < Metodo para enviar archivos, (__dirname + ) para direccionar una ruta HTML
    

    listen() {
       this.app.listen(this.port, () => {
            console.log(`Server active in http://localhost:${this.port}`);
        });
    }
}







module.exports = Server;