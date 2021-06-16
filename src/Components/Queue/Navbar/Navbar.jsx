import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({ enqueue, dequeue, dequeueAll }) => {
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

	const handleEnqueue = (e) => {
		enqueue(value);
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link style={{ textDecoration: 'none' }} to={'/'}>
				<span className='navbar-brand'> {'◀'} </span>
			</Link>
			<div className='navbar-brand'>
				Queue{' '}
				<span style={{ color: '#4039ad', fontWeight: 'bold' }}>Visualizer</span>
			</div>
			<div className='d-flex'>
				<div className='item mx-3'>
					<input
						id='stack-input'
						type='number'
						value={value}
						onChange={handleChange}
						className='queue-input'
						placeholder='Enter a Number to enqueue'
					/>
				</div>
				<div className='item mx-3'>
					<button className='btn btn-outline-success' onClick={handleEnqueue}>
						enqueue
					</button>
				</div>
				<div className='item mx-3'>
					<button className='btn btn-outline-danger' onClick={dequeue}>
						dequeue
					</button>
				</div>
				<div className='item mx-3'>
					<button className='btn btn-outline-warning' onClick={dequeueAll}>
						dequeue All
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
