import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../ui/AppBar';

interface LayoutProps {
	token: string | null;
}

const Layout: FC<LayoutProps> = ({ token }) => {
	return (
		<>
			<AppBar token={token} />
			<Outlet />
		</>
	);
};

export default Layout;
