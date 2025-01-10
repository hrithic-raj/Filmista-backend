import mongoose, { Schema} from 'mongoose';
import IGenre from '../interfaces/genreInterface';

const GenreSchema = new Schema<IGenre>(
    {
        genre: { type: String, required: true, unique: true },
        poster: { type: String, required: true },
        isArchive:{ type: Boolean, default: false },
        movies: [{ type: Schema.Types.ObjectId, ref: 'Movie'}],
    },
    {timestamps: true}
);

const Genre = mongoose.model<IGenre>('Genre', GenreSchema);

export default Genre;