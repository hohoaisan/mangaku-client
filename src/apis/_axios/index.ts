import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    withCredentials: 'true',
  },
};

const AxiosClient: AxiosInstance = axios.create(axiosConfig);

export default AxiosClient;
