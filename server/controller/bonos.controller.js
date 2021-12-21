const logger = require('../logger/api.logger');
const bonoService = require('../services/bono.service');

class BonoController {

    async getBonos() {
        logger.info('Controller: etBonos')
        return await bonoService.getBonos();
    }

    async getBono(id) {
        logger.info('Controller: getBono')
        return await bonoService.getBono(id);
    }

    async createBono(bono) {
        logger.info('Controller: createBono', bono);
        return await bonoService.createBono(bono);
    }

    async updateBono(bono) {
        logger.info('Controller: updateBono', bono);
        return await bonoService.updateBono(bono);
    }

}
module.exports = new BonoController();