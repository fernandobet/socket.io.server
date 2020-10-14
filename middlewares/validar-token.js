const jwt = require('jsonwebtoken');

const validarToken = (req,res,next)=>{

    const _token = req.header('x-token');
    if(_token==null)
    {
        return res.status(401).json({
            ok:false,
            msg:'El token esta vacio'
        });
    }
    try 
    {
        const{uid} = jwt.verify(_token,process.env.JWT_KEY);
        req.uid = uid;
        next();
    } 
    catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'El token no existe'
        });
    }
}

module.exports ={
    validarToken
}