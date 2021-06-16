import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({ push, pop, popAll }) => {
	const [value, setValue] = useState(0);

	const handleChange = (e) => {
		let val = e.target.value;
		if (val.trim() === '') {
			val = 0;
		} else {
			val = parseInt(val);
			if (val > 999) {
				val = 999
			}
		}
		setValue(val);
	};

	const handlePush = (e) => {
		push(value);
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link style={{ textDecoration: 'none' }} to={'/'}>
				<span className='navbar-brand'> {'◀'} </span>
			</Link>
			<div className='navbar-brand'>
				Stack{' '}
				<span style={{ color: '#4039ad', fontWeight: 'bold' }}>Visualizer</span>
			</div>
			<div className='d-flex'>
				<div className='item mx-3'>
					<input
						id='stack-input'
						type='number'
						value={value}
						onChange={handleChange}
						className='stack-input'
						placeholder='Enter a Number to Push'
					/>
				</div>
				<div className='item mx-3'>
					<button className='btn btn-outline-success' onClick={handlePush}>
						Push
					</button>
				</div>
				<div className='item mx-3'>
					<button className='btn btn-outline-danger' onClick={pop}>
						Pop
					</button>
				</div>
				<div className='item mx-3'>
					<button className='btn btn-outline-warning' onClick={popAll}>
						Pop All
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
