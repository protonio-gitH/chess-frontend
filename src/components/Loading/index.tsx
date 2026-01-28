import React, { FC, memo } from 'react';
import { CircularProgress } from '@mui/material';


const Loading: FC = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<CircularProgress />
		</div>
	);
};

export default memo(Loading);
