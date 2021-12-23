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

}

module.exports = new BonoRepository();