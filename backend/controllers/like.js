const Sauce = require('../models/Sauce'); //Import model Sauce



exports.likeSauce = (req, res, next) => { //export this function to routes/sauces


    //Search object in DB
    Sauce
        .findOne({ _id: req.params.id }) //find one object with id url
        .then((objectLiked) => {

            if(objectLiked.usersLiked.includes(req.body.userId)) { //check if userId is in array usersLiked ↓
                console.log('test')
                Sauce.updateOne(
                    { _id: req.params.id }, 
                    { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } } //if present in usersLiked likes = -1 (from 1 to 0) and pull userId in array
                )
                .then(() => next()) //no problem pass next
                .catch((error) => res.status(400).json({ error })) //if problem return error 400 bad req

            } else if(objectLiked.usersDisliked.includes(req.body.userId)) { //check if userId is in array usersDisliked ↓
                Sauce.updateOne(
                    { _id: req.params.id }, 
                    { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } } //if present in usersDisliked dislikes = -1 (from 1 to 0) and pull userId in array
                )
                .then(() => next()) //no problem pass next
                .catch((error) => res.status(400).json({ error })) //if problem return error 400 bad req
            } else {
                next() //no problem pass next
            }

        })
        .catch((error) => res.status(404).json({ error })); //if general problem return error 400 bad req
};

exports.onChangeLikeState = (req, res) => { //export this function to routes/sauces

    if(req.body.like === 1) { //if req body send 1

        Sauce
        .updateOne(
            { _id: req.params.id }, //update one object search with _id
            { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } } //add 1 like on object _id and push user in array usersLiked
        )
        .then(() => res.status(201).json({ message: "Sauce like 1" })) //promise ok return message in console
        .catch((error) => res.status(400).json({ error })); //if problem return error 400 bad req

    } else if(req.body.like === -1) { //if req body send 1

        Sauce
        .updateOne(
            { _id: req.params.id }, //update one object search with _id
            { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } } //add 1 dislike on object _id and push user in array usersLiked
        )
        .then(() => res.status(201).json({ message: "Sauce dislike 1" })) //promise ok return message in console
        .catch((error) => res.status(400).json({ error })); //if problem return error 400 bad req

    } else {
        res.status(201).json({ message: "Sauce 0" }) //no problem return 201 updated
    }

}