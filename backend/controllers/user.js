const bcrypt = require('bcrypt'); //Install bcrypt
const jwt = require('jsonwebtoken'); //Install jsonwebtoken
const User = require('../models/User'); //Import User.schema from models
require('dotenv').config();




//Create a user account
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //Hash password with bcrypt x10
        .then(hash => {
            const user = new User({ //Use User.schema import
                email: req.body.email,
                password: hash
            });
            user.save() //save new User in DB
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) //res 201 it's OK, create new user
                .catch(error => res.status(400).json({ message: 'Compte déjà existant' })); //res 400 if mail in already exist in DB

        })
        .catch(error => res.status(500).json({ error }));
};

//Login to a user account
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'}); //res 400 if no match login/password for login
            }
            bcrypt.compare(req.body.password, user.password) //bcrypt compare req input with data password of user
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' }); //bcrypt compare hash req input with data hash password of user
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id }, //Attribution new token for id user
                            process.env.TOKEN,
                            { expiresIn: '24h' } //time limit token is valid (hours)
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

