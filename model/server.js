var cors = require('cors')
const express = require('express');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/user';

        // DB Connection
        this.conectarDB();

        // Middleware
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // Cross-domain middleware
        this.app.use( cors() );

        // Parse json body
        this.app.use( express.json() );

        // express middleware
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'))

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })
    }
}

module.exports = Server;

