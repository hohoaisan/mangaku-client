import {AxiosRequestConfig} from 'axios';
import axios from './_axios';
import pick from 'utils/pick';
import {COMICS, COMIC} from './_endpoints';
import {ComicsQuery, ComicDetail, QueryString} from 'types';

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
