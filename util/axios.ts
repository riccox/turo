import axios, { AxiosRequestConfig } from 'axios';
import { toast } from '@/util/toast';

export const defaultAxiosConfig: AxiosRequestConfig<any> = {
  headers: {},
  timeout: parseInt(process.env.HTTP_REQUEST_TIMEOUT ?? '5000'),
};

const instance = axios.create(defaultAxiosConfig);

instance.interceptors.request.use(
  (cfg) => {
    return cfg;
  },
  (err) => {
    toast(`Request Error: ${err}`, { type: 'error' });
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    // http status code 2xx
    if (res.data.code !== 1) {
      // not success
      toast(res.data.msg, { type: 'warning' });
      return Promise.reject(res.data.msg);
    }
    return res;
  },
  (err) => {
    // http status code except 2xx
    toast(`Response Error: ${err}`, { type: 'error' });
    return Promise.reject(err);
  }
);

export default instance;
