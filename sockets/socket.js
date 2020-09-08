//Esto es una exportacio con nombre, por eso la importamos asi
const {io} = require('../index');

//Mensajes del socket
//io viene siendo todo el server
io.on('connection', client => {
    //Client viene siendo un solo cliente que se conecte a nuestro io

    console.log("Cliente conectado");

    client.on('disconnect', () => { 
        console.log("cliente desconectado");
     });

     client.on('mensaje',(payload)=>{
        console.log('Mensaje',payload);
     });

     io.emit('mensaje',{mensaje:"Nuevo mensaje"});


  });