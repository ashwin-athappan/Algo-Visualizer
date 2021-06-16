import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SimpleSelect from './SimpleSelect';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({
	comparisonMode,
	handleComparisonModeChange,
	handleChangeAlgorithm,
	handleStart,
	handleRandomize,
	handleReset,
}) => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link style={{ textDecoration: 'none' }} to={'/'}>
				<span className='navbar-brand'> {'◀'} </span>
			</Link>
			<div className='navbar-brand'>
				Sorting{' '}
				<span style={{ color: '#4039ad', fontWeight: 'bold' }}>Visualizer</span>
			</div>
			<div className='items'>
				<SimpleSelect pos={0} onAlgoChanged={handleChangeAlgorithm} />
				<FormGroup row>
					<FormControlLabel
						control={
							<Switch
								style={{ color: 'white' }}
								checked={comparisonMode}
								onChange={handleComparisonModeChange}
								name='checkedA'
							/>
						}
						label='Comparison Mode'
					/>
				</FormGroup>
				<SimpleSelect
					pos={1}
					onAlgoChanged={handleChangeAlgorithm}
					comparisonMode={comparisonMode}
				/>
				<button className='btn btn-outline-success m-2' onClick={handleStart}>
					Visualize
				</button>
				<button className='btn btn-outline-primary m-2' onClick={handleReset}>
					Reset
				</button>
				<button
					className='btn btn-outline-warning m-2'
					onClick={handleRandomize}
				>
					Randomize
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
