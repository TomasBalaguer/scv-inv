const { connect, disconnect } = require('../config/db.config');
const { Bono } = require('../model/bonos.model');
const logger = require('../logger/api.logger');
const { errorResponse } = require('../helpers/helper');

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
        var bono = await this.getBono(req.id);
        var date = new Date().toLocaleDateString();
        var price = bono.price;
        price[date] = req.price;
        console.log(price)
        let data = {};
        try {
            console.log(date)
            data = await Bono.findByIdAndUpdate(req.id , 
                {
                   price: price
                }, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log('Actualizado')
                }
            })
        } catch(err) {
            logger.error('Error::' + err);
        }
        return errorResponse(200, bono.name+ " actualizado exitosamente", data);
    }

}

module.exports = new BonoRepository();