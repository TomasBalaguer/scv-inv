const { connect, disconnect } = require('../config/db.config');
const { getInvestments } = require('../controller/user.controller');
const logger = require('../logger/api.logger');
const { User } = require('../model/user.model');

class UserService {

    constructor() {
        connect();
    }

    async getUser(id) {
        const user = await User.findById(id);
        return user;
    }


    async createUser(user) {
        let data = {};
        try {
            data = await User.create(user);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateUser(user) {
        var userInvestments = user.investments;
        let data = {};
        try {
            data = await User.findByIdAndUpdate(user._id , 
                {
                   investments: user.investments
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

module.exports = new UserService();