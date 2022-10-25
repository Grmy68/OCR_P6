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

                                                    ////// Likes and userLiked //////

            //if userId = true & if like = 1 (objectLiked = false / !objectLiked = true)
            if (!objectLiked.usersLiked.includes(req.body.userId) && req.body.like === 1) { //if user is not present in [usersLiked] && body request like === 1

                console.log("Like from 0 to 1")

                //update objectSauce's like BDD
                //add like (position 1)
                Sauce
                    .updateOne(
                        { _id: req.params.id },
                        { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
                    )
                    .then(() => res.status(201).json({ message: "Sauce like 1" }))
                    .catch((error) => res.status(400).json({ error }));
            };

            if (objectLiked.usersLiked.includes(req.body.userId) && req.body.like === 0) { //if user is present in [usersLiked] && body request like === 0

                console.log("Like from 1 to 0")

                //update objectSauce's like BDD
                //delete like (position 0)
                Sauce
                    .updateOne(
                        { _id: req.params.id },
                        { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
                    )
                    .then(() => res.status(201).json({ message: "Sauce like 0" }))
                    .catch((error) => res.status(400).json({ error }));
            };


                                                    ////// Dislikes and usersDisliked //////

            if (!objectLiked.usersDisliked.includes(req.body.userId) && req.body.like === -1) { //if user is not present in [usersDisliked] && body request like === -1

                console.log("Like from 0 to -1 || Dislike from 0 to 1")

                //update objectSauce's like BDD
                //add dislike (position -1)
                Sauce
                    .updateOne(
                        { _id: req.params.id },
                        { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
                    )
                    .then(() => res.status(201).json({ message: "Sauce dislike 1" }))
                    .catch((error) => res.status(400).json({ error }));
            };

            if (objectLiked.usersDisliked.includes(req.body.userId) && req.body.like === 0) { //if user is present in [usersDisliked] && body request like === 0

                console.log("Like from -1 to 0 || Dislike from 1 to 0")

                //update objectSauce's like BDD
                //delete dislike (position 0)
                Sauce
                    .updateOne(
                        { _id: req.params.id },
                        { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
                    )
                    .then(() => res.status(201).json({ message: "Sauce dislike 0" }))
                    .catch((error) => res.status(400).json({ error }));
            };

        })
        .catch((error) => res.status(404).json({ error }));
};