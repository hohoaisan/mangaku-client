import {AxiosRequestConfig} from 'axios';
import axios from './_axios';
import pick from 'utils/pick';
import {COMICS, COMIC, FAVORITES, FAVORITE_CHAPTER} from './_endpoints';
import {
  ComicsQuery,
  ComicDetail,
  QueryString,
  Favorite,
  ComicsFavoriteQuery,
} from 'types';

export const getAllComics = async (
  props: QueryString,
  AxiosOptions?: AxiosRequestConfig,
): Promise<ComicsQuery> => {
  const data = pick(props, ['search', 'scope', 'page', 'limit', 'sortBy']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: COMICS,
      params: data,
    })
    .then(res => res.data);
  return result;
};

export const getComic = async (
  id: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<ComicDetail> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: COMIC.replace(':comicId', id),
    })
    .then(res => res.data);
  return result;
};

export const getFavoriteComic = async (
  id: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Favorite | null> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: FAVORITE_CHAPTER.replace(':comicId', id),
    })
    .then(res => res.data);
  return result;
};

export const deleteFavoriteComic = async (
  id: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Favorite> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'delete',
      url: FAVORITE_CHAPTER.replace(':comicId', id),
    })
    .then(res => res.data);
  return result;
};

export const createFavoriteComic = async (
  id: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Favorite> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: FAVORITES,
      data: {
        comicId: id,
      },
    })
    .then(res => res.data);
  return result;
};

export const getFavoriteComics = async (
  props: QueryString,
  AxiosOptions?: AxiosRequestConfig,
): Promise<ComicsFavoriteQuery> => {
  const data = pick(props, ['search', 'page', 'limit', 'sortBy']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      params: data,
      url: FAVORITES,
    })
    .then(res => res.data);
  return result;
};
