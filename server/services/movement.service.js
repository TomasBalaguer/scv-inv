const { connect, disconnect } = require('../config/db.config');
const { Movement } = require('../model/movement.model');
const logger = require('../logger/api.logger');
const { User } = require('../model/user.model');

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
        var variation;
        if(movement.action == '+')
        {
            variation = '-' + movement.totalPrice;

        }else{
            variation = '+' + movement.totalPrice;

        }
        try {
            data = await Movement.create(movement);
            await User.findByIdAndUpdate(movement.user, {
                $inc: {balance: variation}, function (err, docs) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log("Updated Docs : ", docs);
                    }
                }})
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