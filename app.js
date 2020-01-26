const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// const Thing = require('./models/thing');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const cardRoutes = require('./routes/card');
const measureRoutes = require('./routes/measure');

mongoose.connect('mongodb+srv://william:mongowilpw@mycluster-xkfok.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/stuff', stuffRoutes);
app.use('/api/me/card', cardRoutes);
app.use('/api/me/measure', measureRoutes);

module.exports = app;