const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  userId: { type: String, required: true },
  likes: { type: Number, default: 0, required: false },
  dislikes: { type: Number, default: 0, required: false },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }]
});

module.exports = mongoose.model('Sauce', sauceSchema);