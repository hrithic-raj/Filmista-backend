import mongoose from 'mongoose';
interface IGenre {
    genre: string;
    poster: string;
    isArchive: boolean;
    movies: mongoose.Types.ObjectId[];
};

export default IGenre;