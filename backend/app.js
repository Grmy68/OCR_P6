const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const app = express();
const path = require('path');


//MongoDB Connection
mongoose.connect('mongodb+srv://Grmy68:FinalFantasy7@p6oc.1jn1loe.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
//Parse the request's body
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(bodyParser.json());
//Set users route in app
app.use('/api/auth', userRoutes);
//Set sauces route in app
app.use('/api/sauces', sauceRoutes);
//Set images route in app with path.join
app.use('/images', express.static(path.join(__dirname, 'images')));

//Export app module (express) to server
module.exports = app;