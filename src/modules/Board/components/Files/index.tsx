import React, { FC } from 'react';
import styles from './index.module.scss';
import { Files as FilesConstants } from '../../constants/Files';

const Files: FC = () => {
	return (
		<ul className={styles['files-list']}>
			{Object.keys(FilesConstants).map(file => (
				<li key={file}>{file}</li>
			))}
		</ul>
	);
};

export default Files;
