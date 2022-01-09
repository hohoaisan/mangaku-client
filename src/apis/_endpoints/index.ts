export const REGISTER = '/auth/register';
export const LOGIN = '/auth/login';
export const LOGOUT = '/auth/logout';
export const TOKEN_REFRESH = '/auth/refresh-tokens';
export const PASSWORD_FORGOT = '/forgot-password';
export const PASSWORD_RESET = '/auth/reset-password';
export const EMAIL_VERIFYCATION = '/auth/send-verification-email';
export const EMAIL_VERIFY = 'auth/verify-email';
export const PROFILE = '/profile';
export const COMICS = '/comics';
export const COMIC = '/comics/:comicId';
export const COMIC_CHAPTERS = '/comics/:comicId/chapters';
export const COMIC_CHAPTER = '/comics/:comicId/chapters/:chapterId';
export const COMIC_COMMENTS = '/comics/:comicId/comments';
export const COMIC_COMMENT = '/comics/:comicId/comments/:commentId';
export const COMIC_REVIEWS = '/comics/:comicId/reviews';
export const COMIC_REVIEW = '/comics/:comicId/reviews/:userId';
export const FAVORITES = '/favorites';
export const FAVORITE_CHAPTER = '/favorites/:comicId';
export const HISTORY = '/history';
export const HISTORY_READ_COMIC = '/history/:comicId';
export const HISTORY_READ_CHAPTER = '/history/:comicId/chapters/:chapterId';
