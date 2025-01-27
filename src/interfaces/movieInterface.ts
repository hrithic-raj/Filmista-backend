import mongoose from "mongoose";

interface IMovie {
    title: string;
    description: string;
    releaseDate?: string;
    duration?: string;
    genres: mongoose.Types.ObjectId[];
    languages: mongoose.Types.ObjectId[];
    cast: {
        name: string;
        role: string;
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
    rating?: number;
    reviews?: {
        userId: string;
        review: string;
        date: string;
    }[];
}
export default IMovie;