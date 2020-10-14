//App de express
const express   = require('express');
const app       = express();
const path      = require('path');
require('dotenv').config();

//Lectura y parseo del body
app.use(express.json());
//Creamos middleWare
app.use('/api/login',require('./routes/auth'));

//DB config
require('./database/config').dbConnection();

//Path publico
const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); //Exportamos nuesto io de esta manera
require('./sockets/socket');//importamos nuestra funcionalidad de nuestro socket io


server.listen(process.env.PORT,(error)=>{
    if(error)
        throw new Error(error);
    console.log("Servidor corriendo en el puerto!!!!",process.env.PORT);
});