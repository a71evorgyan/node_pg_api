import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../../uploads'));
  },

  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})

export const upload = multer ({
  storage: storage,
  fileFilter: function(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true)
    } else {
      console.log('only images supported');
      callback(null, false);
    }
  }
})