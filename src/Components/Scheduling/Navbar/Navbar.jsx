import { useState } from 'react';
import SimpleSelect from './SimpleSelect';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({
	visualize,
	addRow,
	changeAlgorithm,
	algorithm,
	changeQuantum,
}) => {
	const [quantum, setQuantum] = useState(1);

	const handleChangeAlgorithm = (e) => {
		changeAlgorithm(parseInt(e.target.value));
	};

	const handleChangeQuantum = (e) => {
		if (e.target.value === '') {
			setQuantum(1);
			changeQuantum(1);
			return;
		}
		const q = parseInt(e.target.value);
		if (q) {
			setQuantum(q);
			changeQuantum(q);
		}
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link style={{ textDecoration: 'none' }} to={'/'}>
				<span className='navbar-brand'> {'◀'} </span>
			</Link>
			<div className='navbar-brand'>
				Scheduling{' '}
				<span style={{ color: '#4039ad', fontWeight: 'bold' }}>Visualizer</span>
			</div>
			<SimpleSelect changeAlgorithm={handleChangeAlgorithm} />
			<button className='btn btn-outline-success m-2' onClick={visualize}>
				Generate Gnatt Chart
			</button>
			<button className='btn btn-outline-primary m-2' onClick={addRow}>
				Add Process
			</button>
			<label className='ms-3 me-2'>Quantum:</label>
			{algorithm === 3 ? (
				<input
					className='quantum'
					value={quantum}
					onChange={handleChangeQuantum}
				/>
			) : (
				<input
					className='quantum'
					value={quantum}
					onChange={handleChangeQuantum}
					disabled
				/>
			)}
		</nav>
	);
};

export default Navbar;
