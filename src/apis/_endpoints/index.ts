export * from './auth';
export * from './profile';

export const COMICS = '/comics';
export const COMIC = '/comics/:comicId';
export const COMIC_CHAPTERS = '/comics/:comicId/chapters';
export const COMIC_CHAPTER = '/comics/:comicId/chapters/:chapterId';
export const FAVORITES = '/favorites';
export const FAVORITE_CHAPTER = '/favorites/:comicId';
export const HISTORY = '/history';
export const HISTORY_READ_COMIC = '/history/:comicId';
export const HISTORY_READ_CHAPTER = '/history/:comicId/chapters/:chapterId';
