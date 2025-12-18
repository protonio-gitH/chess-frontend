import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../ui/AppBar';

interface LayoutProps {
	isAuth: boolean;
}

const Layout: FC<LayoutProps> = ({ isAuth }) => {
	return (
		<>
			<AppBar isAuth={isAuth} />
			<Outlet />
		</>
	);
};

export default Layout;
