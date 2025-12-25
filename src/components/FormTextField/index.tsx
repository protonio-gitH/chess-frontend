import { FC, memo } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { ChangeEvent } from 'react';

interface FormTextFieldProps {
	label: string;
	value: string;
	required?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	error?: string[];
}

const FormTextField: FC<FormTextFieldProps> = ({ label, value, required = false, onChange, error }) => {
	return (
		<Box component="div">
			<TextField required={required} label={label} value={value} onChange={onChange} sx={{ width: '100%' }} />
			{error?.length ? (
				<Typography color="red" component="div">
					{error.join(', ')}
				</Typography>
			) : null}
		</Box>
	);
};

export default memo(FormTextField);
