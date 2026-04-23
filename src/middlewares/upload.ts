import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../lib/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'conteudos', // ou 'noticias', 'formacoes', etc.

        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1080, height: 1080, crop: 'limit' }],
    } as any,
});

export const upload = multer({ storage });
