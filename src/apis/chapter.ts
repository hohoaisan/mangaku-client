import {AxiosRequestConfig} from 'axios';
import axios from './_axios';
import pick from 'utils/pick';
import {COMIC_CHAPTER, COMIC_CHAPTERS} from './_endpoints';
import {QueryString, ComicChaptersQuery, ChapterDetail} from 'types';

export const getAllChapters = async (
  comicId: string,
  props: QueryString,
  AxiosOptions?: AxiosRequestConfig,
): Promise<ComicChaptersQuery> => {
  const data = pick(props, ['scope', 'page', 'limit', 'sortBy']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: COMIC_CHAPTERS.replace(':comicId', comicId),
      params: data,
    })
    .then(res => res.data);
  return result;
};

export const getChapter = async (
  comicId: string,
  chapterId: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<ChapterDetail> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: COMIC_CHAPTER.replace(':comicId', comicId).replace(
        ':chapterId',
        chapterId,
      ),
    })
    .then(res => res.data);
  return result;
};
