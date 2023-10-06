const path = require('path');
const multer  = require('multer');
const { v4: uuidv4 } = require('uuid');
const { log } = require('console');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      const fileExtension = path.extname(file.originalname);
      cb(null, uniqueSuffix + fileExtension);
    },
  });
  
const fileFilter = (req, file, cb) => {
const allowedExtensions = ['.jpg', '.jpeg', '.png'];
const fileExtension = path.extname(file.originalname).toLowerCase();
if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
} else {
    cb(new Error('Неверный формат файла. Допустимы только JPG и PNG файлы.'));
}
};
  
const upload = multer({
storage: storage,
limits: { fileSize: 1024 * 1024 }, // Максимальный размер файла 1 мб
fileFilter: fileFilter,
});

module.exports = upload;