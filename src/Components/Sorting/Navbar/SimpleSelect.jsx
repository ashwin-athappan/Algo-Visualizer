import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SimpleSelect = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState('0');
	const handleChange = (event) => {
		setValue(event.target.value);
		props.onAlgoChanged(event, props.pos);
	};

	let disabled = false;
	if (props.pos === 1) 
		disabled = !props.comparisonMode

	return (
		<div className='ml-2 mr-2'>
			<FormControl className={classes.formControl}>
				<InputLabel id='demo-simple-select-label'>Algorithm</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={value}
					disabled={disabled}
					onChange={handleChange}
				>
					<MenuItem value={0} style={{ selected: true }}>
						Bubble Sort
					</MenuItem>
					<MenuItem value={1}>Selection Sort</MenuItem>
					<MenuItem value={2}>Insertion Sort</MenuItem>
					<MenuItem value={3}>Merge Sort</MenuItem>
                    <MenuItem value={4}>Quick Sort</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

export default SimpleSelect;
