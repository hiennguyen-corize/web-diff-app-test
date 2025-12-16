import axios, { AxiosInstance, AxiosRequestConfig, CancelToken } from 'axios';

/** Request options */
type RequestOptions<P> = {
  params?: P;
  cancelToken?: CancelToken;
  signal?: AbortSignal;
  token?: string;
  cookies?: string;
};

const generateClient = (host?: string) => {
  const getDefaultParams = () => {
    return {
      lang: 'en',
    };
  };

  const validateStatus = (status: number): boolean => {
    return status >= 200 && status < 400;
  };

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: host,
    validateStatus: validateStatus,
  });

  const get = async <T, R, P>(
    path: string,
    request?: T,
    options?: RequestOptions<P>
  ): Promise<R> => {
    const headers: AxiosRequestConfig['headers'] = {};

    if (options?.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
    }

    if (options?.cookies) {
      headers['Cookie'] = options.cookies;
    }

    return axiosInstance
      .get(encodeURI(path), {
        params: {
          ...getDefaultParams(),
          ...request,
          ...options?.params,
        },
        headers,
        cancelToken: options?.cancelToken,
        signal: options?.signal,
      })
      .then((response) => response.data);
  };

  const post = async <T, R, P>(
    path: string,
    request: T,
    options?: RequestOptions<P>
  ): Promise<R> => {
    return axiosInstance
      .post(path, request, {
        params: {
          ...getDefaultParams(),
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  };

  const put = async <T, R, P>(
    path: string,
    request: T,
    options?: RequestOptions<P>
  ): Promise<R> => {
    return axiosInstance
      .put(path, request, {
        params: {
          ...getDefaultParams(),
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  };

  const deleteRequest = async <T, R, P>(
    path: string,
    request?: T,
    options?: RequestOptions<P>
  ): Promise<R> => {
    return axiosInstance
      .delete(path, {
        data: request,
        params: {
          ...getDefaultParams(),
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  };

  return {
    get,
    put,
    post,
    delete: deleteRequest,
  };
};

export const httpClient = generateClient();
