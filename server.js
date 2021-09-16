const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const hbs = require('hbs');
const users_model = require('./model/database.js');
const bcrypt = require('bcrypt');

// app.use('articless', require('./articles/article.js'))
app.use(require('./validation/users_validation.js'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/assets/css")) // middle ware 
app.use(express.static(__dirname + "/assets/js")) // middle ware
app.set('view engine', 'hbs')
app.set('views', __dirname + "/templates/views");
hbs.registerPartials(__dirname + "/templates/partials");

app.use(express.json());


app.get('/', (req, res) => {
    const succesfull = req.query.succesfull;
    const incorrect_credentials = req.query.incorrect_credentials
    const invalid_credentials = req.query.invalid_credentials
    res.render('login', { succesfull, incorrect_credentials, invalid_credentials });
})

app.get('/db', (req, res) => {
    res.render('dashboard/dashboard')
})

app.listen(port, () => {
    console.log("server running on 5000  ");
})