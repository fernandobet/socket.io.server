const Band = require("./band");

class Bands{
    constructor(){
        this.bands = [];
    }

    //Aqui le indicamos a node que tipo de dato recibbira bands
    addBand(band = new Band()){
        this.bands.push(band);
    }

    getBands(){
        return this.bands;
    }

    deleteBand(id = ''){
        this.bands = this.bands.filter(x=>x.id!=id);
        return this.bands;
    }

    voteBand(id=''){
        this.bands = this.bands.map(band=>{
            if(band.id === id){
                band.votes++;
                return band; //retornas la banda, a tu lista de bandas, pero la banda que incrementaste
            }else{
                return band; //retornas la banda
            }
        });
    }
}

//Tenemos que hacer esto en node para poder exportar clases
module.exports= Bands;