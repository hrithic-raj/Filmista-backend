import mongoose, {Document, Schema} from "mongoose";
import Icelebrity from "../interfaces/celebrityInterface";


const celebritySchema: Schema<Icelebrity> = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String},
        googleId: {type: String},
        otp: {type: String},
        refreshToken: { type: String },
        role: {type: String, default: 'celebrity'},
        isVerified: {type: Boolean, default: false},
    },
    { timestamps: true}
);

const Celebrity = mongoose.model<Icelebrity>('Celebrity', celebritySchema);

export default Celebrity;