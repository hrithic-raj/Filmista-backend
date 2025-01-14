import mongoose, { Schema} from 'mongoose';
import ILanguage from '../interfaces/languageInterface';

const LanguageSchema = new Schema<ILanguage>(
    {
        language: { type: String, required: true, unique: true },
        poster: { type: String, required: true },
        isArchive:{ type: Boolean, default: false },
        movies: [{ type: Schema.Types.ObjectId, ref: 'Movie'}],
    },
    {timestamps: true}
);

const Language = mongoose.model<ILanguage>('Language', LanguageSchema);

export default Language;