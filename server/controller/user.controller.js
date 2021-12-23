const logger = require("../logger/api.logger");
const bonoService = require("../services/bono.service");
const userService = require("../services/user.service");
const movementContorller = require("./movement.contorller");

class UserController {
  //GET USER WITH INVESTMENTS
  async getUser(id) {
    logger.info("Controller: getUser");
    var user = await userService.getUser(id);
    return await this.userReform(user);
  }

  async createUser(user) {
    logger.info("Controller: createUser", user);
    return await userService.createUser(user);
  }

  async userReform(user) {
    var movements = await movementContorller.getUserMovements(user._id);
    var investments = await this.getInvestments(movements);
    var newUser = {
      _id: user._id,
      name: user.name,
      investments: investments,
    };

    return await this.updateUser(newUser);
  }

  async getInvestments(movements) {
    var investments = [];
    movements.forEach((element) => {
      var id = element.bono._id;
      if (!investments.find((x) => x._id === id)) {
        investments.push({
          _id: id,
          name: element.bono.name,
          qty: element.qty,
          price: element.bono.price[Object.keys(element.bono.price).pop()],
          lastUpdate: Object.keys(element.bono.price).pop(),
        });
      } else if (element.action == "+") {
        investments.find((x) => x._id === id).qty += element.qty;
      } else if (element.action == "-") {
        investments.find((x) => x._id === id).qty -= element.qty;
      }
    });
     investments = investments.filter(function(el) { return el.qty != 0; }); 
    return investments;
  }

  async updateUser(user) {
    await userService.updateUser(user);
    return await userService.getUser(user._id);
  }


}
module.exports = new UserController();
