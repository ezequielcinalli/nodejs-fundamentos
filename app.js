const express = require('express');
const app = express();
const port = 3000;

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render("index", { title: "Titulo dinamico" });
});

app.get('/services', (req, res) => {
    res.render("services", { title: "Nuestros servicios" });
});

app.get('/contact', (req, res) => {
    res.render("contact", { title: "Nuestro contacto" });
});

app.use((req, res, next) => {
    res.status(404).render("404");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});