const express = require('express');
const bonosController = require('../controller/bonos.controller');
const router = express.Router()
// Routes


router.get('/', (req, res) => {
    bonosController.getBonos().then(data => res.json(data));
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(req.params.id, "PARAETROOOO")
    bonosController.getBono(id).then(data => res.json(data));
});


router.post('/', (req, res) => {
    console.log(req.body);
    bonosController.createBono(req.body).then(data => res.json(data));
});

router.post('/updateprice', (req, res) => {
    bonosController.updatePrice(req.body).then(data => res.json(data))
})

module.exports = router