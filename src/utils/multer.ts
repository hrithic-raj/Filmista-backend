import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer, { StorageEngine } from 'multer';
import dotenv from 'dotenv';

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'filmista',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    }as { folder: string; allowed_formats: string[] },
}) as StorageEngine;


const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;