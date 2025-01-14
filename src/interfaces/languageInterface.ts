import mongoose from 'mongoose';
interface ILanguage {
    language: string;
    poster: string;
    isArchive: boolean;
    movies: mongoose.Types.ObjectId[];
};

export default ILanguage;