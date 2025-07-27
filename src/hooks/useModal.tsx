import React, { createContext, useContext, useState, FC } from 'react';
import { ModalContextType, ModalOptions } from '../types';

const defaultOptions: ModalOptions = { modalType: 'login', open: false };

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [modalOptions, setModalOptions] = useState<ModalOptions>(defaultOptions);

	return <ModalContext.Provider value={{ modalOptions, setModalOptions }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) throw new Error('useModal must be used within a ModalProvider');
	return context;
};
