const express = require('express');
const router = express.Router();

const Pet = require('../models/pet');

router.get('/', async(req, res) => {
    try {
        const arrayPets = await Pet.find();
        res.render("pets", { pets: arrayPets });
    } catch (e) {
        console.log(e);
    }

});

module.exports = router