const Sauce = require('../models/Sauce'); //Import model Sauce



exports.likeSauce = (req, res, next) => {

    console.log("C'est liké !");

    //Affiche req.body
    console.log("-->CONTENU req.body - ctrl like");
    console.log(req.body);

    //récupérer id url
    console.log("-->CONTENU req.params - ctrl like");
    console.log(req.params);

    //mise au format de l'id
    console.log("id --> _id");
    console.log({ _id: req.params.id });

    //Cherhcer objet DB
    Sauce
        .findOne({ _id: req.params.id })
        .then((objectLiked) => {

            if(objectLiked.usersLiked.includes(req.body.userId)) {
                console.log('test')
                Sauce.updateOne(
                    { _id: req.params.id }, 
                    { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
                )
                .then(() => next())
                .catch((error) => res.status(400).json({ error }))

            } else if(objectLiked.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne(
                    { _id: req.params.id }, 
                    { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
                )
                .then(() => next())
                .catch((error) => res.status(400).json({ error }))
            } else {
                next()
            }

        })
        .catch((error) => res.status(404).json({ error }));
};

exports.onChangeLikeState = (req, res) => {

console.log('test')

    if(req.body.like === 1) {

        Sauce
        .updateOne(
            { _id: req.params.id },
            { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
        )
        .then(() => res.status(201).json({ message: "Sauce like 1" }))
        .catch((error) => res.status(400).json({ error }));

    } else if(req.body.like === -1) {

        Sauce
        .updateOne(
            { _id: req.params.id },
            { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
        )
        .then(() => res.status(201).json({ message: "Sauce dislike 1" }))
        .catch((error) => res.status(400).json({ error }));

    } else {
        res.status(201).json({ message: "Sauce 0" })
    }

}