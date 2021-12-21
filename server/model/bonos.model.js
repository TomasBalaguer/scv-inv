const mongoose = require('mongoose');

const bonoSchema = new mongoose.Schema({ 
                name: 'string', 
                price:  'object'
             });

const Bono = mongoose.model('bonos', bonoSchema);

module.exports = {
    Bono
}