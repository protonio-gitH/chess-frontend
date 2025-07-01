import { memo, FC } from 'react';
import styles from './index.module.scss';

interface ControlsButtonProps {
	logo: string;
	action: 'first' | 'next' | 'prev' | 'last';
	handleContolBtnClick: (action: 'first' | 'next' | 'prev' | 'last') => void;
}

const ControlsButton: FC<ControlsButtonProps> = ({ logo, action, handleContolBtnClick }) => {
	return (
		<button className={styles.moveList__controls} data-action={action} onClick={() => handleContolBtnClick(action)}>
			<svg className={styles.moveList__icon}>
				<use href={logo} />
			</svg>
		</button>
	);
};

export default memo(ControlsButton);
