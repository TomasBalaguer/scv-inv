const express = require('express');
const userController = require('../controller/user.controller');
const { errorResponse } = require('../helpers/helper');
const router = express.Router()
// Routes

router.get('/:id', (req, res) => {
    const id = req.params.id
    userController.getUser(id).then(data => res.json(data));
});


router.post('/', (req, res) => {

    //VALIDATE DATA
    const{ name, balance, investments } = req.body;
    if(name && balance && investments)
    {
        userController.createUser(req.body).then(data => res.json(data));

    }else{
        res.status(400).json(errorResponse(400, 'Invalid data!', req.body))
    }
});

module.exports = router