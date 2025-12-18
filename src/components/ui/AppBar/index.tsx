import React, { FC, memo, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useModal } from '../../../hooks/useModal';
import { ModalType } from '../../../types/modalContextTypes';
import { decodeToken } from '../../../utils/decodeToken';
import { Link } from '@mui/material';
import { useAppDispatch } from '../../../store';
import { logoutThunk } from '../../../store/authSlice';
import handleThunk from '../../../utils/handleThunk';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const signButtons: { title: string; type: ModalType }[] = [
	{ title: 'Login', type: 'login' },
	{ title: 'Registration', type: 'register' },
];

interface AppBarProps {
	isAuth: boolean;
}

const AppBarComponent: FC<AppBarProps> = ({ isAuth }) => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const { modalOptions, setModalOptions } = useModal();

	const dispatch = useAppDispatch();

	// let email;
	// if (token) {
	// 	email = decodeToken(token)?.email;
	// }

	const handleModal = (type: ModalType) => {
		setModalOptions({ modalType: type, open: true });
	};

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleExit = async () => {
		// dispatch(logout());
		await handleThunk(dispatch, logoutThunk);
		localStorage.removeItem('token');
		if (anchorElNav) {
			handleCloseNavMenu();
		}
	};

	return (
		<AppBar sx={{ marginBottom: 'clamp(1rem, 3vw, 4rem);' }} position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							{pages.map(page => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography sx={{ textAlign: 'center' }}>{page}</Typography>
								</MenuItem>
							))}
							{isAuth && (
								<Box>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography sx={{ textAlign: 'center' }}>Profile</Typography>
									</MenuItem>
									<MenuItem onClick={handleExit}>
										<Typography sx={{ textAlign: 'center' }}>Exit</Typography>
									</MenuItem>
								</Box>
							)}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Button key={page} onClick={handleCloseNavMenu} color="inherit" sx={{ my: 2, display: 'block' }}>
								{page}
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						{/* <Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map(setting => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
								</MenuItem>
							))}
						</Menu> */}
					</Box>
					{isAuth ? (
						<Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' }, gap: '1rem' }}>
							<Button color="inherit" sx={{ my: 2, display: 'block' }}>
								Profile
							</Button>
							<Button onClick={handleExit} color="inherit" sx={{ my: 2, display: 'block' }}>
								Exit
							</Button>
						</Box>
					) : (
						signButtons.map(page => (
							<Button
								onClick={() => handleModal(page.type)}
								key={page.title}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page.title}
							</Button>
						))
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default memo(AppBarComponent);
