const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre:{
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    pass:{
        type:String,
        require:true
    },
    online:{
        type:Boolean,
        default:false
    }
});

//Sobrescribimos el metodo toJSON, para cuando imprimamos la respuesta , sea una respuesta
//personalizada, sin mostrar la contraseña del usuario registraod

UsuarioSchema.method('toJSON',function(){
    //Extraemos __v,_id y pass del objeto
    // Usamos el operador 'res', vendrian siendo los '...' y lo que resta del objeto lo almacena en object
    //el this.toObject es la instancia del objeto que estamos creando en ese momento
    const{__v,_id,pass,...object} = this.toObject();
    //Vamos a modificar la respuesta , crearemos una nueva propiedad llamada
    //object.uid y ahi almacenaremos el _id excluido previamente
    object.uid = _id;
    return object;
})

module.exports = mongoose.model('Usuario',UsuarioSchema);
