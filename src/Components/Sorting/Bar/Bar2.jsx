import { useState, useEffect } from 'react';
import './Bar.css';

const Bars2 = ({ index, length, color }) => {
	const [len, setLength] = useState(length);

	useEffect(() => {
		setLength(length);
	}, [length]);

	// const colors = ['#3d5af1', '#ff304f', '#83e85a', '#ff5959'];

	const colors = ['#40514e', 
					'#2f89fc', 
					'#30e3ca', 
					'#ff304f'];

	let barStyle = {
		background: colors[color],
		height: length,
		marginTop: 200 - length,
	};

	let textStyle = {
		position: 'relative',
		top: Math.floor(length / 2) - 10,
		width: length,
		left: -Math.floor(length / 2) + 11,
		background: 'transparent',
		border: 'none',
	};

	return (
		<div className='bar' style={barStyle}>
			<input
				type='number'
				style={textStyle}
				value={len}
				className='text'
				disabled
			/>
		</div>
	);
};

export default Bars2;
