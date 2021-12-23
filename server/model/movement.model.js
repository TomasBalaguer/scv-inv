const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({ 
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'user'
                },
                bono: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'bonos'
                }, 
                qty: Number,
                unitPrice: Number,
                totalPrice: Number,
                action: String
             },{
                 timestamps: true
             });

const Movement = mongoose.model('movement', movementSchema);

module.exports = {
    Movement
}