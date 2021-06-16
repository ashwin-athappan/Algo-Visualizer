import React, { useState } from 'react';

function Process({
	index,
	processName,
	arrivalTime,
	executionTime,
	serviceTime,
	priority,
	handleDelete,
	changePriority,
}) {
	const [pri, setPriority] = useState(0);

	const handlePriorityChange = (e) => {
		let val = e.target.value;
		setPriority(val);
		changePriority(index, val);
	};

	return priority === null ? (
		<tr>
			<td>{processName}</td>
			<td>{arrivalTime}</td>
			<td>{executionTime}</td>
			<td>{serviceTime}</td>
			<td>
				<button className='btn btn-danger' onClick={(e) => handleDelete(index)}>
					Delete
				</button>
			</td>
		</tr>
	) : (
		<tr>
			<td>{processName}</td>
			<td>{arrivalTime}</td>
			<td>{executionTime}</td>
			<td>{serviceTime}</td>
			<td>
				<input
					className='priority'
					type='number'
					value={pri}
					onChange={(e) => handlePriorityChange(e)}
				/>
			</td>
			<td>
				<button className='btn btn-danger' onClick={(e) => handleDelete(index)}>
					Delete
				</button>
			</td>
		</tr>
	);
}

export default Process;
