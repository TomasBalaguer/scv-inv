const { connect, disconnect } = require('../config/db.config');
const { Movement } = require('../model/movement.model');
const logger = require('../logger/api.logger');

class MovementService {

    constructor() {
        connect();
    }

    async getMovements() {
        const movement = await Movement.find({});
        return movement;
    }

    async getMovement(id) {
        const movement = await Movement.findById(id);
        return movement;
    }

    async createMovement(movement) {
        let data = {};
        try {
            data = await Movement.create(movement);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getUserMovements(id) {
        const movement = await Movement.find({user: id}).populate("bono");
        return movement;
    }

}

module.exports = new MovementService();