const Sauce = require('../models/Sauce'); //Import model Sauce
const fs = require('fs'); //For delete image


///////////// CRUD CTRL /////////////

////// Create new Sauce //////
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; //Autorize delete sauce id ↓
    delete sauceObject._userId; //UserId tied sauceId

    if (req.file) { //1- only if image present↓↓
        const sauce = new Sauce({
            ...sauceObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//get img to repo
        })

        sauce.save()
            .then(() => res.status(201).json({ message: "sauce created" }))
            .catch(error => res.status(401).json(error))

    } else {
        return res.status(401).json({ message: "missing image" })//2- else return error
    };
};

////// View one sauce //////
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};
////// View all sauces //////
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

////// Modify a sauce //////
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //send new img to repo
    } : { ...req.body };

    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) { //If requete user's id different sauce user's id post ↓
                res.status(401).json({ message: 'Not authorized' }); // Error not auth
            } else {
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

////// Delete a sauce //////
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) { //If requete user's id different sauce user's id post ↓
                res.status(401).json({ message: 'Not authorized' });// Error not auth
            } else {
                const filename = sauce.imageUrl.split('/images/')[1]; //splice entry 2 of array
                fs.unlink(`images/${filename}`, () => { //Delete image from repo
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Sauce supprimée' }) }) //Promise ok: response 201
                        .catch(error => res.status(401).json({ error })); //If error: response 401
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};




