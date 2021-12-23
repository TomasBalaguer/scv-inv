const { connect, disconnect } = require('../config/db.config');
const { Bono } = require('../model/bonos.model');
const logger = require('../logger/api.logger');

class BonoRepository {

    constructor() {
        connect();
    }

    async getBonos() {
        const bonos = await Bono.find({});
        console.log('bonos:::', bonos);
        return bonos;
    }

    async getBono(id) {
        const bono = await Bono.findById(id);
        console.log('bonos:::', id);
        return bono;
    }

    async createBono(bono) {
        let data = {};
        try {
            data = await Bono.create(bono);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateBono(bono) {
        let data = {};
        try {
            data = await Bono.updateOne(bono);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updatePrice(req) {
        
        let data = {};
        try {
            var date = '"price.'+ new Date().toLocaleDateString()+'"';
            console.log(date)
            data = await Bono.findByIdAndUpdate(req.id , 
                {
                   
                }, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs : ", docs);
                }
            })
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

}

module.exports = new BonoRepository();