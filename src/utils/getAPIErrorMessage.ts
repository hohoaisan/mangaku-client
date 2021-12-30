import axios from 'axios';

const getAPIErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response?.data?.message;
    }
    if (error.response?.status && error.response?.status >= 500) {
      return 'Server error';
    }
    if (error.response) {
      return 'Unknow error';
    }
    return 'Network error';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknow error';
};
export default getAPIErrorMessage;
