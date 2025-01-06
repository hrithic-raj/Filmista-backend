import mongoose, { Schema } from "mongoose";
import IMovie from "../interfaces/movieInterface";

const movieSchema: Schema<IMovie> = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: String, required: true },
    duration: { type: Number, required: true },
    genres: { type: [String], required: true },
    language: { type: [String], required: true },
    director: { type: String, required: true },
    cast: [
        {
            name: { type: String, required: true },
            characterName: { type: String, required: true },
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
    tags: { type: [String] },
    rating: { type: Number },
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