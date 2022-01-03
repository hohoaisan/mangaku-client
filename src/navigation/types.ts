import {QueryString} from 'types';

export type StackParams = {
  Home: undefined;
  Details: {data: string} | undefined;
  Search: QueryString | undefined;
  Favorite: QueryString | undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  NotFound: undefined;
  ComicDetail: {comicId: string};
  ComicChapter: {comicId: string; chapterId: string};
};
