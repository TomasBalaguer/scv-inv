const express = require('express');
const movementContorller = require('../controller/movement.contorller');
const { errorResponse } = require('../helpers/helper');
const router = express.Router()
// Routes


router.get('/', (req, res) => {
    movementContorller.getMovements().then(data => res.json(data));
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    movementContorller.getMovement(id).then(data => res.json(data));
});


router.post('/', (req, res) => {

    //VALIDATE DATA
    const{ user, bono, qty, unitPrice, totalPrice, action } = req.body;
    if(user && bono && qty && unitPrice && totalPrice && ( action == '+' || action == '-'))
    {
        movementContorller.createMovement(req.body).then(data => res.json(data));

    }else{
        res.status(400).json(errorResponse(400, 'Invalid data!', req.body))
    }
});

module.exports = router