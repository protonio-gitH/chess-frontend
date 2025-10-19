import React, { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { useServices } from './useServices';
import { loginSuccess } from '../store/authSlice';
import { isTokenOverdue } from '../utils/isTokenOvedue';
import { decodeToken } from '../utils/decodeToken';
import { AppDispatch, ModalOptions } from '../types';
import APIService from '../api';

export const useAuthEffect = (
	isAuth: boolean,
	token: string | null,
	dispatch: AppDispatch,
	api: APIService,
	modalOptions: ModalOptions,
	setModalOptions: React.Dispatch<React.SetStateAction<ModalOptions>>,
) => {
	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			const decodedToken = decodeToken(storedToken);
			if (decodedToken && !isTokenOverdue(decodedToken.exp)) {
				api.setHeader('Authorization', `Bearer ${storedToken}`);
				dispatch(loginSuccess(storedToken));
			}
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
