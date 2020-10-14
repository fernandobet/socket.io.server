const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../token/jwt');

//Refresh token
const refreshToken = async(req,res)=>{

    const uid = req.uid;
    const _usuarioDB = await Usuario.findById(uid);
    if(_usuarioDB!=null)
    {
        const _newToken = await generarJWT(_usuarioDB.uid);

        res.status(200).json({
            ok:true,
            _usuarioDB,
            _newToken
        });

        return;
    }

    res.status(401).json({
        ok:true,
        msg: 'Usuario ya no esta registrado en la db'
    });
}

//Login usuario
const login = async(req,res = response)=>{
    try 
    {
        const {email,pass} = req.body;
        const _usuarioDB = await Usuario.findOne({email});
        //Validamos el email
        if(!_usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Email incorrecto'
            });
        }
        //Validamos el pass
        const _passDB = bcrypt.compareSync(pass,_usuarioDB.pass);
        if(!_passDB){
            return res.status(404).json({
                ok:false,
                msg:'Contraseña incorrecta'
            });
        }
        //Generamos token
        const _token =await generarJWT(_usuarioDB.id);

        res.json({
            ok:true,
            _usuarioDB,
            _token
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        });
    }
}

//Crear nuevo usuario
const crearUsuario = async (req,res = response)=>{

    try 
    {
        const {email,pass} = req.body;
        const _existeEmail = await Usuario.findOne({email});

        if(_existeEmail)
        {
          return  res.status(400).json({
                ok:false,
                msg:'Este correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);
        //Encriptamos contraseña
        const _salt = bcrypt.genSaltSync();
        usuario.pass = bcrypt.hashSync(pass,_salt);
        //Guardamos el usuario
        await usuario.save();
        //Le generamos su token
        const token = await generarJWT(usuario.id);
    
        res.json({
            ok:true,
            usuario,
            token
        });
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}

module.exports={
    crearUsuario,
    login,
    refreshToken
}