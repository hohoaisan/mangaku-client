import {StackParams} from 'navigation';
import {AxiosRequestConfig} from 'axios';

export type QueryString = {
  search?: string;
  scope?: string;
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
};

export type QueryResponse = {
  page: number;
  pages: number;
  limit: number;
  total: number;
};

export type Author = {
  name: string;
  id: string;
};
export type Genre = {
  name: string;
  id: string;
};
export type Format = {
  name: string;
  id: string;
};

export type Comic = {
  id: string;
  title: string;
  description: string;
  rating: number | null;
  numFavorites: number;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  cover: string;
  authors: Author[];
};

export type Chapter = {
  id: string;
  number: number;
  name: string;
  approval_status: string | null;
  numPages: number;
  volume: number;
  createdAt: string | undefined;
  updatedAt: string | undefined;
};

export type ChapterPage = {
  imageId: string;
  order: number;
  url: string;
};

export type Favorite = {
  comicId: string;
  userId: string;
  subscribe: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ChapterDetail = Chapter & {
  pages: ChapterPage[];
  nextChapter: Chapter | null;
  prevChapter: Chapter | null;
};

export type ComicDetail = Comic & {
  genres: Genre[];
  formats: Format[];
};

export type ComicsQuery = QueryResponse & {
  data: Comic[];
};

export type ComicChaptersQuery = QueryResponse & {
  data: Chapter[];
};

export type ComicFavoriteItem = Favorite & {comic: Comic};

export type ComicsFavoriteQuery = QueryResponse & {
  data: ComicFavoriteItem[];
};

export type LandingSectionProps = {
  id: string;
  heading: string;
  customQuery?: QueryString;
  hideViewmore?: boolean;
  screen?: keyof StackParams;
  getComics?: (
    props: QueryString,
    options?: AxiosRequestConfig,
  ) => Promise<ComicsQuery>;
};
