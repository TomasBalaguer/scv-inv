const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
                name: String, 
                balance:  Number,
                investments: Array
             });

const User = mongoose.model('user', userSchema);

module.exports = {
    User
}