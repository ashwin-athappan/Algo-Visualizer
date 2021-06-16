import React from 'react';
import Slider from './Slider';

export default function ControlPannel({
	handleChangeCount,
	handleSpeedChange,
}) {
	return (
		<div className='container-dark p-2'>
			<div className='d-flex justify-content-center p-3'>
				<Slider handleChange={handleChangeCount} type={'Count'} />
				<Slider handleChange={handleSpeedChange} type={'Speed'} />
			</div>
		</div>
	);
}
