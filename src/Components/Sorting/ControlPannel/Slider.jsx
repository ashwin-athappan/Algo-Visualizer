import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
	root: {
		width: 300,
		margin: '0 5em',
		color: "white"
	},
});

function valuetext(value) {
	return `${value}`;
}

export default function DiscreteSlider({ handleChange, type }) {
	const classes = useStyles();

	const handleCountChange = (e) => {
		let value = e.target.innerText;
		if (isNaN(parseInt(value))) {
			value = parseInt(e.target.textContent.substring(9, e.target.textContent.length - 6));
			if (isNaN(value)) {
				value = 10;
			}
		} else {
			value = parseInt(value);
		}
		console.log(value);
		handleChange(value);
	};

	const handleSpeedChange = (e) => {
		let value = e.target.innerText;

		if (isNaN(parseInt(value))) {
			value = parseInt(e.target.textContent[e.target.textContent.length - 1]);
			if (isNaN(value)) {
				value = 1;
			}
		} else {
			value = parseInt(value);
		}
		console.log(value);
		handleChange(value);
	};

	return type === 'Count' ? (
		<div className={classes.root}>
			<Typography id='discrete-slider' gutterBottom>
				Bar Count
			</Typography>
			<Slider
				defaultValue={10}
				getAriaValueText={valuetext}
				aria-labelledby='discrete-slider'
				valueLabelDisplay='auto'
				onChangeCommitted={handleCountChange}
				step={5}
				min={5}
				max={30}
			/>
		</div>
	) : (
		<div className={classes.root}>
			<Typography id='discrete-slider' gutterBottom>
				Speed
			</Typography>
			<Slider
				defaultValue={1}
				getAriaValueText={valuetext}
				aria-labelledby='discrete-slider'
				valueLabelDisplay='auto'
				onChangeCommitted={handleSpeedChange}
				step={1}
				min={1}
				max={5}
			/>
		</div>
	);
}
