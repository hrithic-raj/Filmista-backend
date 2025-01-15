// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer, { StorageEngine } from 'multer';
// import dotenv from 'dotenv';

// dotenv.config();


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// const storage = new CloudinaryStorage({
//     // cloudinary: cloudinary,
//     // params: {
//     //     folder: 'filmista',
//     //     resource_type: 'raw',
//     //     allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
//     // }as { folder: string; allowed_formats: string[] },
    
//     // cloudinary: cloudinary,
//     // params: async (req, file) => {
//     //   const isPDF = file.mimetype === 'application/pdf';
//     //   return {
//     //     folder: 'filmista',
//     //     resource_type: isPDF ? 'raw' : 'image', // Use 'raw' for PDFs
//     //     format: isPDF ? 'pdf' : undefined,     // Explicitly set 'pdf' format for PDFs
//     //     public_id: file.originalname.split('.')[0], // Use original filename without extension
//     //   };
//     // },

//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         const isPDF = file.mimetype === 'application/pdf';
//         return {
//         folder: 'filmista',
//         resource_type: 'auto', // Let Cloudinary determine the correct type
//         format: isPDF ? 'pdf' : undefined,
//         public_id: file.originalname.split('.')[0], // Use original filename without extension
//         };
//     },
// }) as StorageEngine;


// const upload = multer({
//     storage,
//     limits: { fileSize: 10 * 1024 * 1024 },
// });

// export default upload;



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
  params: async (req, file) => {
    const isPDF = file.mimetype === 'application/pdf';
    return {
      folder: 'filmista',
      resource_type: 'auto', // Ensure PDFs are treated as raw files
    //   format: isPDF ? 'pdf' : undefined, // Explicitly set format for PDFs
      public_id: file.originalname.split('.')[0], // Use original filename without extension
    };
  },
}) as StorageEngine;

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

export default upload;