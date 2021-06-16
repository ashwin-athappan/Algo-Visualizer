import React from 'react';

function RoundRobinProcecss({
	index,
	processName,
	arrivalTime,
	executionTime,
	handleDelete,
}) {

	return (
		<tr>
			<td>{processName}</td>
			<td>{arrivalTime}</td>
			<td>{executionTime}</td>
			<td>
				<button className='btn btn-danger' onClick={(e) => handleDelete(index)}>
					Delete
				</button>
			</td>
		</tr>
	)
}

export default RoundRobinProcecss;
