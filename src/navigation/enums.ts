import {PathConfigMap} from '@react-navigation/native';

import {StackParams} from './types';

export const paths: PathConfigMap<StackParams> = {
  Home: '',
  Details: '/details',
  Search: '/comics',
  Favorite: '/favorite',
  Profile: '/profile',
  History: '/history',
  Login: '/login',
  Register: '/register',
  NotFound: '/*',
  ComicDetail: '/comics/:comicId',
  ComicChapter: '/comics/:comicId/chapters/:chapterId',
};

export enum ScreenName {
  HOME = 'Home',
  SEARCH = 'Search',
  FAVORITE = 'Favorite',
  PROFILE = 'Profile',
  READ_HISTORY = 'History',
  DETAILS = 'Details',
  LOGIN = 'Login',
  REGISTER = 'Register',
  COMIC_DETAIL = 'ComicDetail',
  COMIC_CHAPTER = 'ComicChapter',
  NOT_FOUND = 'NotFound',
}
