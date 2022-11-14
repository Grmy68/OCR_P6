const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const app = express();
const path = require('path');
require('dotenv').config();
const morgan = require('morgan')
// const rateLimit = require('express-rate-limit');

morgan('dev')


//MongoDB Connection
mongoose.connect(process.env.URL_DB_CONNECT, //URL_DB_CONNECT dotenv 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// resolve an unknown error when creating a user from the front.
app.use(cors());

/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});*/

  
//Parse the request's body
app.use(express.json());

app.use(bodyParser.json());
//Set users route in app
app.use('/api/auth', userRoutes);
//Set sauces route in app
app.use('/api/sauces', sauceRoutes);
//Set images route in app with path.join
app.use('/images', express.static(path.join(__dirname, 'images')));





//Export app module (express) to server
module.exports = app;
