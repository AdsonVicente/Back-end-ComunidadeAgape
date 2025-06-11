import multer from 'multer';

export default {
  upload() {
    return multer({
      storage: multer.memoryStorage(), // <-- importante para ter req.file.buffer
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Tipo de arquivo inválido.'));
        }
      }
    });
  }
};
