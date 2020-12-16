const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", { title: "Titulo dinamico" });
});

router.get('/services', (req, res) => {
    res.render("services", { title: "Nuestros servicios" });
});

router.get('/contact', (req, res) => {
    res.render("contact", { title: "Nuestro contacto" });
});

module.exports = router