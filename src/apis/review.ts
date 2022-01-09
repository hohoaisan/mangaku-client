import {AxiosRequestConfig} from 'axios';
import axios from './_axios';
import {COMIC_REVIEW, COMIC_REVIEWS} from './_endpoints';
import {Review} from 'types';

export const getReview = async (
  comicId: string,
  userId: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Review> => {
  const result = await axios
    .request<Review>({
      ...AxiosOptions,
      method: 'get',
      url: COMIC_REVIEW.replace(':comicId', comicId).replace(':userId', userId),
    })
    .then(res => res.data);
  return result;
};

export const deleteReview = async (
  comicId: string,
  userId: string,
  AxiosOptions?: AxiosRequestConfig,
): Promise<null> => {
  const result = await axios
    .request<null>({
      ...AxiosOptions,
      method: 'delete',
      url: COMIC_REVIEW.replace(':comicId', comicId).replace(':userId', userId),
    })
    .then(res => res.data);
  return result;
};

export const createReview = async (
  comicId: string,
  body: Pick<Review, 'content' | 'rating'>,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Review> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: COMIC_REVIEWS.replace(':comicId', comicId),
      data: body,
    })
    .then(res => res.data);
  return result;
};

export const updateReview = async (
  comicId: string,
  userId: string,
  body: Pick<Review, 'content' | 'rating'>,
  AxiosOptions?: AxiosRequestConfig,
): Promise<Review> => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: COMIC_REVIEW.replace(':comicId', comicId).replace(':userId', userId),
      data: body,
    })
    .then(res => res.data);
  return result;
};
