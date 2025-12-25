import { memo, FC } from 'react';
import styles from './index.module.scss';
import logo_next from '../../assets/icon-history-next.svg';
import logo_previous from '../../assets/icon-history-previous.svg';
import logo_next_double from '../../assets/icon-history-next-double.svg';
import logo_previous_double from '../../assets/icon-history-previous-double.svg';
import ControlsButton from '../ControlsButton';
import { MoveActions } from '../../types/move.types';

interface MoveControlsProps {
	handleContolBtnClick: (action: MoveActions) => void;
}

const MoveControls: FC<MoveControlsProps> = ({ handleContolBtnClick }) => {
	return (
		<div className={styles.moveList__controls}>
			<ControlsButton logo={logo_previous_double} action="first" handleContolBtnClick={handleContolBtnClick} />
			<ControlsButton logo={logo_previous} action="prev" handleContolBtnClick={handleContolBtnClick} />
			<ControlsButton logo={logo_next} action="next" handleContolBtnClick={handleContolBtnClick} />
			<ControlsButton logo={logo_next_double} action="last" handleContolBtnClick={handleContolBtnClick} />
		</div>
	);
};

export default memo(MoveControls);
