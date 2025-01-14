import mongoose from "mongoose";

interface IMovie {
    title: string;
    description: string;
    releaseDate: string;
    duration: number;
    genres: mongoose.Types.ObjectId[];
    language: mongoose.Types.ObjectId[];
    // genres: string[];
    // language: string[];
    director: string;
    cast: {
        name: string;
        characterName: string;
        celebrityId?: string;
    }[];
    images?: {
        poster: string;
        horizontalPoster: string;
        other: string[];
    };
    videos?: {
        trailer: string;
        others: string[];
    };
    tags?: string[];
    rating: number;
    reviews?: {
        userId: string;
        review: string;
        date: string;
    }[];
}
export default IMovie;