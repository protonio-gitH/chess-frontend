import { memo, FC } from 'react';
import styles from './index.module.scss';

const ControlsButton: FC<{ logo: string }> = ({ logo }) => {
	return (
		<div className={styles.moveList__controls}>
			<button>
				<svg className={styles.moveList__icon}>
					<use href={logo} />
				</svg>
			</button>
		</div>
	);
};

export default memo(ControlsButton);
