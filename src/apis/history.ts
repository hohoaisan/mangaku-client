import {AxiosRequestConfig} from 'axios';
import axios from './_axios';
import pick from 'utils/pick';
import {HISTORY, HISTORY_READ_COMIC, HISTORY_READ_CHAPTER} from './_endpoints';
import {QueryString, Favorite, ComicsReadHistoryQuery} from 'types';

export const deleteComicReadHistory = async (
  id: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Favorite> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'delete',
      url: HISTORY_READ_COMIC.replace(':comicId', id),
    })
    .then(res => res.data);
  return result;
};

export const addComicChapterToHistory = async (
  comicId: string,
  chapterId: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<unknown> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: HISTORY_READ_CHAPTER.replace(':comicId', comicId).replace(
        ':chapterId',
        chapterId,
      ),
    })
    .then(res => res.data);
  return result;
};

export const getComicsReadHistory = async (
  props: QueryString,
  AxiosOptions?: AxiosRequestConfig,
): Promise<ComicsReadHistoryQuery> => {
  const data = pick(props, ['search', 'page', 'limit']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      params: data,
      url: HISTORY,
    })
    .then(res => res.data);
  return result;
};
