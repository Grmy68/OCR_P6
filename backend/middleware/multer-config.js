//Install multer
const multer = require('multer');

const MIME_TYPES = { //Files extensions accepted
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); //Set in images repository
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); //Delete origin's filename
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); //Name sauce + timestamp + . + jpg/png
  }
});

module.exports = multer({storage: storage}).single('image'); //Only image files