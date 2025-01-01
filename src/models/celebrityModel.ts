import mongoose, {Document, Schema} from "mongoose";

export interface Icelebrity extends Document {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    isVerified: boolean;
    otp?: string;
}

const celebritySchema: Schema<Icelebrity> = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String},
        googleId: {type: String},
        isVerified: {type: Boolean, default: false},
        otp: {type: String},
    },
    { timestamps: true}
);

const Celebrity = mongoose.model<Icelebrity>('celebrity', celebritySchema);

export default Celebrity;