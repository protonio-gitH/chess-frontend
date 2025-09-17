export interface ApiResponse<T> {
	data: T;
	status: number;
	headers: Headers;
}

export type RequestOptions = Omit<RequestInit, 'method' | 'headers'>;
