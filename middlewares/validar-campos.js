const { validationResult } = require('express-validator');

//El next nos servira para ir brincando los middleWares 
const validarCampos = (req,res,next)=>{

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
                ok:false,
                errors: errores.mapped()
            });
    }
    next();
}

module.exports={
    validarCampos
}