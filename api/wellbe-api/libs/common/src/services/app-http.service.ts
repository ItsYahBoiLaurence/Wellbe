import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from '@x/logging';
import { AppException, ErrorInfo, UnhandledError } from '../models';
import { HeaderNames } from '../constants';

@Injectable()
export class AppHttpService {
  constructor(
    private httpService: HttpService,
    private loggerService: LoggerService
  ) {}

  async post<TR, TS>(
    url: string,
    item: TR,
    opts?: AxiosRequestConfig
  ): Promise<TS> {
    try {
      const result = await this.httpService
        .post(url, item, this.getAxiosOptions(opts))
        .toPromise();
      return result?.data;
    } catch (error) {
      this.loggerService.error(`AppHttpService.post | ${url}`, {
        error,
        data: item,
      });
      throw new AppException(
        !!error?.response?.data
          ? (error.response.data as ErrorInfo)
          : new UnhandledError().error
      );
    }
  }

  async put<TR, TS>(
    url: string,
    item: Partial<TR>,
    opts?: AxiosRequestConfig
  ): Promise<TS> {
    try {
      const result = await this.httpService
        .put(url, item, this.getAxiosOptions(opts))
        .toPromise();
      return result?.data;
    } catch (error) {
      this.loggerService.error(`AppHttpService.put | ${url}`, {
        error,
        data: item,
      });
      throw new AppException(
        !!error?.response?.data
          ? (error.response.data as ErrorInfo)
          : new UnhandledError().error
      );
    }
  }

  async delete<T>(url: string, opts?: AxiosRequestConfig): Promise<T> {
    try {
      const result = await this.httpService
        .delete(url, this.getAxiosOptions(opts))
        .toPromise();
      return result?.data;
    } catch (error) {
      this.loggerService.error(`AppHttpService.delete | ${url}`, {
        error,
      });
      throw new AppException(
        !!error?.response?.data
          ? (error.response.data as ErrorInfo)
          : new UnhandledError().error
      );
    }
  }

  async get<T>(url: string, opts?: AxiosRequestConfig): Promise<T> {
    try {
      const result = await this.httpService
        .get(url, this.getAxiosOptions(opts))
        .toPromise();
      return result?.data;
    } catch (error) {
      this.loggerService.error(`AppHttpService.get | ${url}`, {
        error,
      });
      throw new AppException(
        !!error?.response?.data
          ? (error.response.data as ErrorInfo)
          : new UnhandledError().error
      );
    }
  }

  async patch<TR, TS>(
    url: string,
    item: Partial<TR>,
    opts?: AxiosRequestConfig
  ): Promise<TS> {
    try {
      const result = await this.httpService
        .patch(url, item, this.getAxiosOptions(opts))
        .toPromise();
      return result?.data;
    } catch (error) {
      this.loggerService.error(`AppHttpService.patch | ${url}`, {
        error,
        data: item,
      });
      throw new AppException(
        !!error?.response?.data
          ? (error.response.data as ErrorInfo)
          : new UnhandledError().error
      );
    }
  }

  private getAxiosOptions(axiosOpts: AxiosRequestConfig) {
    const headers = {};
    if (!axiosOpts?.headers?.[HeaderNames.CORRELATION_ID]) {
      const id = uuidv4();
      headers[HeaderNames.CORRELATION_ID] = id;
    }
    return {
      ...axiosOpts,
      headers: {
        ...axiosOpts?.headers,
        ...headers,
      },
    };
  }
}
