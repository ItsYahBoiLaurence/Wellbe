/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth } from 'aws-amplify';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiResponseError } from '../types';
import { APP_CONFIG } from '../utils/constants';

const DEFAULT_ERR_MESSAGE = 'Something went wrong. Please try again.';

const getJwtToken = async (): Promise<{
  accessToken?: string;
  jwtToken?: string;
}> => {
  try {
    const auth = await Auth.currentSession();
    return {
      accessToken: auth.getAccessToken().getJwtToken(),
      jwtToken: auth.getIdToken().getJwtToken(),
    };
  } catch (error) {
    return { accessToken: undefined, jwtToken: undefined };
  }
};

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken, jwtToken } = await getJwtToken();
    if (jwtToken && accessToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
      config.headers['AccessToken'] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type Props<T> = AxiosRequestConfig<T> & {
  needsAuthToken?: boolean;
  headers?: any;
  useFullError?: boolean;
  responseType?: 'blob' | 'json';
};

class ApiError extends Error {
  type: string;
  response: any;

  constructor(params: ApiResponseError) {
    super(params.message);

    if (Error?.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = 'ApiError';
    this.message = params.message;
    this.type = params.type;
    this.response = params;
  }
}

async function callApi<R>(
  endpoint: string,
  { headers, useFullError = false, responseType, ...payload }: Props<any> = {}
): Promise<R> {
  const config = {
    url: endpoint,
    method: 'GET',
    headers,
    responseType,
    ...payload,
  };
  try {
    const response = await axiosInstance<any, AxiosResponse<ApiResponse<R>>>(
      config
    );
    if (responseType === 'blob') return response?.data as R;
    if (!response?.data) throw new Error(DEFAULT_ERR_MESSAGE);
    if (response.data?.data) return response.data.data;
    throw new Error(response.data.error?.message ?? DEFAULT_ERR_MESSAGE);
  } catch (e) {
    const err = e as AxiosError<ApiResponseError, ApiResponseError>;
    if (!err?.response?.data)
      throw new Error(err?.message || DEFAULT_ERR_MESSAGE);
    if (useFullError && err.response.data) {
      throw new ApiError(err.response.data);
    } else {
      throw new Error(err?.message || DEFAULT_ERR_MESSAGE);
    }
  }
}

export const getValidationErrorMessage = (error: ApiResponseError) => {
  if (error.type !== 'validation_error') return error.message;
  if (!error.response?.[0]?.errors?.length) return error.message;
  const msg = error.response[0].errors[0];
  return msg;
};

export default callApi;
