declare module 'multer-storage-cloudinary' {
    import { StorageEngine } from 'multer';
    import { UploadApiOptions } from 'cloudinary';

    export interface Options {
        cloudinary: any;
        params?: UploadApiOptions & { folder?: string };
    }

    export class CloudinaryStorage implements StorageEngine {
        constructor(options: Options);
    }
}