import { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export interface SnackbarState extends SnackbarOrigin {
	open: boolean;
	type: typeof Alert.prototype.props.severity;
	message: string | null;
}
