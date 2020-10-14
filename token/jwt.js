const jwt = require('jsonwebtoken');

const generarJWT = (uid)=>{

    return new Promise((resolve,reject)=>{
        const _payload = {uid};
        jwt.sign(_payload,process.env.JWT_KEY,{
            expiresIn:'24h'
        },(error,token)=>{
            if(error){
                return reject('No se pudo generar el token');
            }
            else{
                return resolve(token);
            }
        })
    });
}

module.exports={generarJWT};