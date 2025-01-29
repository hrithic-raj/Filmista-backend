import mongoose from "mongoose";

interface IWatchlist extends Document {
    userId: mongoose.Types.ObjectId;
    movies: Array<{
      movieId: mongoose.Types.ObjectId;
    }>;
}

export default IWatchlist;