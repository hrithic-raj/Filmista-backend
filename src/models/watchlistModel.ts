import mongoose, { Schema } from "mongoose";
import IWatchlist from "../interfaces/watchlistInterface";

const WatchlistSchema = new Schema<IWatchlist>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movies: [
        {
            movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
});

export const Watchlist = mongoose.model<IWatchlist>('Watchlist', WatchlistSchema);