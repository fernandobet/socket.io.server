//Esto es una exportacio con nombre, por eso la importamos asi
const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('The doors'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('AC/DC'));
bands.addBand(new Band('The beatles'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Babasonicos'));
bands.addBand(new Band('Babasonicos'));

console.log(bands);

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

     client.on('nuevo-mensaje-cliente',(payload)=>{
        //io.emit('nuevo-mensaje',payload); // Este emite a todos, hasta al que emitio el mensaje
        client.broadcast.emit('nuevo-mensaje',payload);//Con este emitiremos ese mensaje a todos los que estan esucchando el server a exception del "client" que mando el mensaje
     });

     client.emit('active-bands', bands.getBands());

     client.on('vote-band',(payload)=>{
      bands.voteBand(payload.id);
      io.emit('active-bands',bands.getBands());
     });

     client.on('add-band',(payload)=>{
        bands.addBand(new Band(payload['name']));
        io.emit('active-bands',bands.getBands());
     });

     client.on('remove-band',(payload)=>{
      bands.deleteBand(payload.id);
      io.emit('active-bands',bands.getBands());
     });
 
  });