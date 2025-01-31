import mongoose, { Schema } from "mongoose";
import IMovie from "../interfaces/movieInterface";

const movieSchema: Schema<IMovie> = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: String },
    duration: { type: String },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre'}],
    languages: [{ type: Schema.Types.ObjectId, ref: 'Language'}],
    cast: [
        {
            name: { type: String, required: true },
            role: { type: String, required: true },
            profilePicture: { type: String },
            celebrityId: { type: String }
        }
    ],
    images: {
        poster: { type: String, required: true },
        horizontalPoster: { type: String },
        other: { type: [String] }
    },
    videos: {
        trailer: { type: String, required: true },
        others: { type: [String] }
    },
    rating: { type: Number, default: 0},
    reviews: [
        {
            userId: { type: String, required: true },
            review: { type: String, required: true },
            date: { type: Date, required: true }
        }
    ]
});

const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;