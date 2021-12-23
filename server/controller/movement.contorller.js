const logger = require('../logger/api.logger');
const movementService = require('../services/movement.service');

class BonoController {

    async getMovements() {
        logger.info('Controller: getMovements')
        return await movementService.getMovements();
    }

    async getMovement(id) {
        logger.info('Controller: getMovement')
        return await movementService.getMovement(id);
    }

    async createMovement(movement) {
        return await movementService.createMovement(movement);
    }

    async getUserMovements(id) {
        return await movementService.getUserMovements(id);
    }

}
module.exports = new BonoController();