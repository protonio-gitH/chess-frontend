import React, { FC, useState } from 'react';
import { Services } from '../services';
import { config } from '../config';

export const ServicesContext = React.createContext<Services | null>(null);

export const useServices = () => {
	const services = React.useContext(ServicesContext);
	if (!services) {
		throw new Error('useServices must be used within ServicesProvider');
	}
	return services;
};
