const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

require('dotenv').config();

const port = process.env.PORT || 3000;

//Conexion mongodb
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.tmbrf.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connect to mondodb success!"))
    .catch(e => console.log(e))

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + '/public'));

//Rutas
app.use('/', require('./router/web'));
app.use('/pets', require('./router/pets'));

app.use((req, res, next) => {
    res.status(404).render("404");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});