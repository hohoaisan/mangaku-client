import axios from 'axios';
import strings from 'configs/strings';

const getAPIErrorMessage = (error: unknown): string => {
  if (error && axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response?.data?.message;
    }
    if (error.response?.status && error.response?.status >= 500) {
      return strings.errors.server;
    }
    if (error.response) {
      return strings.errors.unknown;
    }
    return strings.errors.network;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return strings.errors.unknown;
};
export default getAPIErrorMessage;
