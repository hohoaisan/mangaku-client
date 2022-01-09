import {AxiosRequestConfig} from 'axios';
import axios from './_axios';
import pick from 'utils/pick';
import {COMIC_COMMENT, COMIC_COMMENTS} from './_endpoints';
import {QueryString, Comment, CommentQuery} from 'types';

export const getComment = async (
  comicId: string,
  commentId: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Comment> => {
  const result = await axios
    .request<Comment>({
      ...AxiosOptions,
      method: 'get',
      url: COMIC_COMMENT.replace(':comicId', comicId).replace(
        ':commentId',
        commentId,
      ),
    })
    .then(res => res.data);
  return result;
};

export const deleteComment = async (
  comicId: string,
  commentId: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<null> => {
  const result = await axios
    .request<null>({
      ...AxiosOptions,
      method: 'delete',
      url: COMIC_COMMENT.replace(':comicId', comicId).replace(
        ':commentId',
        commentId,
      ),
    })
    .then(res => res.data);
  return result;
};

export const createComment = async (
  comicId: string,
  content: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Comment> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: COMIC_COMMENTS.replace(':comicId', comicId),
      data: {
        content,
      },
    })
    .then(res => res.data);
  return result;
};

export const updateComment = async (
  comicId: string,
  commentId: string,
  content: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Comment> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: COMIC_COMMENT.replace(':comicId', comicId).replace(
        ':commentId',
        commentId,
      ),
      data: {
        content,
      },
    })
    .then(res => res.data);
  return result;
};

export const getComments = async (
  comicId: string,
  props: QueryString,
  AxiosOptions?: AxiosRequestConfig,
): Promise<CommentQuery> => {
  const data = pick(props, ['search', 'page', 'limit', 'sortBy']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      params: data,
      url: COMIC_COMMENTS.replace(':comicId', comicId),
    })
    .then(res => res.data);
  return result;
};
