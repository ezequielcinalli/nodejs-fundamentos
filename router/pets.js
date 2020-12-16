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

router.get('/create', (req, res) => {
    res.render("pets/create");
});

router.post('/', async(req, res) => {
    const body = req.body;
    try {
        const petDB = new Pet(body);
        await petDB.save();
        res.redirect('/pets');
    } catch (e) {
        console.log("Error: " + e);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const petDB = await Pet.findOne({ _id: id });
        res.render("pets/detail", { pet: petDB, error: false });
    } catch (e) {
        res.render("pets/detail", { error: true });

    }
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const petDB = await Pet.findByIdAndDelete({ _id: id });
        if (petDB) {
            res.json({ state: true, })
        } else {
            res.json({ state: false, })
        }
    } catch (e) {
        console.log(e);
    }
});

router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const petDB = await Pet.findByIdAndUpdate(id, body, { useFindAndModify: false });
        console.log(petDB);
        res.json({ state: true, })
    } catch (e) {
        console.log("Error: " + e);
        res.json({ state: false, })
    }
});

module.exports = router