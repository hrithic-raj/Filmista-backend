import ILanguage from "../interfaces/languageInterface";
import Language from "../models/languageModel";
import Movie from "../models/movieModel";
import CustomError from "../utils/customErrorHandler";

export const addLanguage = async (newLanguageData: {language?:string; isArchive?: boolean; posterUrl?: string}): Promise<ILanguage> => {
    const newLanguage = new Language({
        language: newLanguageData.language,
        poster: newLanguageData.posterUrl,
        isArchive: newLanguageData.isArchive,
        movies: [],
    });

    return await newLanguage.save();
};

export const updateLanguage = async (langId: string, updatedData:{language?:string; isArchive?:boolean; posterUrl?: string}): Promise<ILanguage | null>=>{
    const language = await Language.findById(langId);
    if(!language) throw new CustomError('Genre not found 404', 404);
    if(updatedData.posterUrl) language.poster = updatedData.posterUrl;
    language.isArchive = updatedData.isArchive;
    if(updatedData.language) language.language = updatedData.language;
    
    return await language.save();
};

export const archiveLanguage = async (id: string): Promise<ILanguage | null> => {
    const language = await Language.findById(id);
    language.isArchive = !language.isArchive;
    await language.save();
    return language;
};

export const getMoviesByLanguage = async (id: string): Promise<ILanguage | null> => {
    const language = await Language.findById(id).populate({
        path: 'movies',
        model: Movie,
        select: 'title description poster horizontalPoster',
    });
    return language;
};