import { memo, FC } from 'react';
import styles from './index.module.scss';
import logo_next from '../../assets/icon-history-next.svg';
import logo_previous from '../../assets/icon-history-previous.svg';
import logo_next_double from '../../assets/icon-history-next-double.svg';
import logo_previous_double from '../../assets/icon-history-previous-double.svg';
import ControlsButton from '../ControlsButton';

const MoveControls: FC = () => {
	return (
		<div className={styles.moveList__controls}>
			<ControlsButton logo={logo_previous_double} />
			<ControlsButton logo={logo_previous} />
			<ControlsButton logo={logo_next} />
			<ControlsButton logo={logo_next_double} />
		</div>
	);
};

export default memo(MoveControls);
