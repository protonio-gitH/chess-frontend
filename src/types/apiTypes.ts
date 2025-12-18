import { AxiosResponseHeaders } from 'axios';
import { Config } from '../config';

// export interface ApiResponse<T> {
// 	data: T;
// 	status: number;
// headers: AxiosResponseHeaders;
// }

export type ConfigAPI = Config['api'];

// export type RequestOptions = Omit<RequestInit, 'method' | 'headers'>;

// export type RequestConfig = { path: string; customOptions: RequestInit };

// export type FetchResponseInterceptor = (response: Response, config: RequestConfig) => Promise<any> | any;
