import React, { useEffect } from 'react';
import { loginSuccess } from '../store/authSlice';
import { isTokenOverdue } from '../utils/isTokenOvedue';
import { decodeToken } from '../utils/decodeToken';
import { AppDispatch, LoginResponse, ModalOptions } from '../types';
import { AxiosResponse } from 'axios';
import { useAppDispatch, useAppSelector } from '../store';
import { useServices } from '../hooks/useServices';
import { useModal } from './useModal';

export const useAuthEffect = () => {
	const { modalOptions, setModalOptions } = useModal();
	const services = useServices();
	const isAuth = useAppSelector(state => state.auth.isAuth);
	const token = useAppSelector(state => state.auth.token);
	const dispatch = useAppDispatch();
	const api = services.getApi();
	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			const response: Promise<AxiosResponse<LoginResponse>> = api.request<LoginResponse>('/auth/refresh', {
				method: 'GET',
			});
			response
				.then(res => {
					const newToken = res.data.accessToken;
					api.setHeader('Authorization', `Bearer ${newToken}`);
					dispatch(loginSuccess(newToken));
				})
				.catch(e => {
					console.error(e.message);
				});
		}
	}, []);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		if (isAuth && storedToken !== token) {
			modalOptions.open && setModalOptions(prev => ({ ...prev, open: false }));
			if (token) {
				api.setHeader('Authorization', `Bearer ${token}`);
				localStorage.setItem('token', token);
			}
		}
	}, [isAuth, token]);
};
