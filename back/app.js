const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const dotenv = require("dotenv");

require('dotenv').config();

mongoose.connect('mongodb+srv://Hakmiller_:Diesel1978@cluster0.znpcm.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());

app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });


    app.use('/images', express.static(path.join(__dirname, 'images')));

    app.use ('/api/sauces', sauceRoutes);
    app.use ('/api/auth', userRoutes);    

    app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;