import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Process from './Process';
import RoundRobinProcess from './RoundRobinProcecss';

import './Scheduling.css';

export default class Scheduling extends Component {
	state = {
		algorithm: 0,
		processList: [
			['P0', 0, 5, 0, 0],
			['P1', 0, 3, 5, 0],
		],
		totalTime: 8,
		result: '',
		isVisualizing: false,
		quantum: 1,
	};

	generateRandomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	addRow = () => {
		let list = this.state.processList;
		let newProcess = [];
		newProcess.push(`P${list.length}`);
		newProcess.push(list.length);
		newProcess.push(this.generateRandomNumber(1, 10));
		newProcess.push(0);
		newProcess.push(0);
		list.push(newProcess);
		this.setState(
			{
				processList: list,
			},
			() => {
				this.recalculateServiceTime();
			}
		);
	};

	deleteRow = (index) => {
		let list = this.state.processList;
		list = list.filter((value, key) => key !== index);
		this.setState({ processList: list }, () => {
			this.recalculateServiceTime();
		});
	};

	findNextIndexWithPriority = (currentIndex, priorities) => {
		var currentPriority = 1000000;
		if (currentIndex !== -1) currentPriority = priorities[currentIndex];
		var resultPriority = 0;
		var resultIndex = -1;
		var samePriority = false;
		var areWeThereYet = false;

		priorities.forEach((value, key) => {
			var changeInThisIteration = false;

			if (key === currentIndex) {
				areWeThereYet = true;
				return true;
			}
			if (value <= currentPriority && value >= resultPriority) {
				if (value === resultPriority) {
					if (currentPriority === value && !samePriority) {
						samePriority = true;
						changeInThisIteration = true;
						resultPriority = value;
						resultIndex = key;
					}
				} else if (value === currentPriority) {
					if (areWeThereYet) {
						samePriority = true;
						areWeThereYet = false;
						changeInThisIteration = true;
						resultPriority = value;
						resultIndex = key;
					}
				} else {
					resultPriority = value;
					resultIndex = key;
				}

				if (value > resultPriority && !changeInThisIteration)
					samePriority = false;
			}
		});
		return resultIndex;
	};

	findNextIndex = (currentIndex, array) => {
		let currentTime = 0;
		if (currentIndex !== -1) currentTime = array[currentIndex];
		let resultTime = 1000000;
		let resultIndex = -1;
		let sameTime = false;
		let areWeThereYet = false;

		array.forEach((value, key) => {
			let changeInThisIteration = false;

			if (key === currentIndex) {
				areWeThereYet = true;
				return true;
			}
			if (value >= currentTime && value <= resultTime) {
				if (value === resultTime) {
					if (currentTime === value && !sameTime) {
						sameTime = true;
						changeInThisIteration = true;
						resultTime = value;
						resultIndex = key;
					}
				} else if (value === currentTime) {
					if (areWeThereYet) {
						sameTime = true;
						areWeThereYet = false;
						changeInThisIteration = true;
						resultTime = value;
						resultIndex = key;
					}
				} else {
					resultTime = value;
					resultIndex = key;
				}

				if (value < resultTime && !changeInThisIteration) sameTime = false;
			}
		});
		return resultIndex;
	};

	recalculateServiceTime = () => {
		let totalExectuteTime = 0;
		let list = this.state.processList;
		let algorithm = this.state.algorithm;
		if (algorithm === 0) {
			for (let i = 0; i < list.length; i++) {
				if (i === 0) {
					totalExectuteTime = list[i][2];
					continue;
				} else {
					list[i][3] = totalExectuteTime;
					let executeTime = list[i][2];
					totalExectuteTime += executeTime;
				}
			}
		} else if (algorithm === 1) {
			let exectuteTimes = [];
			let list = this.state.processList;
			list.forEach((value, key) => {
				exectuteTimes[key] = value[2];
			});
			let currentIndex = -1;
			for (let i = 0; i < exectuteTimes.length; i++) {
				currentIndex = this.findNextIndex(currentIndex, exectuteTimes);

				if (currentIndex === -1) continue;

				list[currentIndex][3] = totalExectuteTime;

				totalExectuteTime += exectuteTimes[currentIndex];
			}
		} else if (algorithm === 2) {
			var exectuteTimes = [];
			var priorities = [];
			let list = this.state.processList;
			list.forEach((value, key) => {
				exectuteTimes[key] = value[2];
				priorities[key] = value[4];
			});
			var currentIndex = -1;
			for (var i = 0; i < exectuteTimes.length; i++) {
				currentIndex = this.findNextIndexWithPriority(currentIndex, priorities);

				if (currentIndex === -1) return;

				list[currentIndex][3] = totalExectuteTime;

				totalExectuteTime += exectuteTimes[currentIndex];
			}
		} else if (algorithm === 3) {
			for (let i = 0; i < list.length; i++) {
				if (i === 0) {
					totalExectuteTime = list[i][2];
					continue;
				} else {
					list[i][3] = totalExectuteTime;
					let executeTime = list[i][2];
					totalExectuteTime += executeTime;
				}
			}
		}
		this.setState({ processList: list, totalTime: totalExectuteTime });
	};

	draw = () => {
		let processComponent = '';
		let timeComponent = '';
		let algorithm = this.state.algorithm;
		let list = this.state.processList;
		document.getElementById('result').innerHTML = '';
		if (algorithm === 0) {
			list.forEach((value, key) => {
				let executeTime = value[2];
				processComponent +=
					'<th style="height: 60px; width: ' +
					executeTime * 20 +
					'px;">P' +
					key +
					'</th>';
				timeComponent += '<td>' + executeTime + '</td>';
			});
			document.getElementById('result').innerHTML =
				'<table id="resultComponent" class="inner-result table table-bordered mt-5"><tr>' +
				processComponent +
				'</tr><tr>' +
				timeComponent +
				'</tr></table>';
		} else if (algorithm === 1) {
			let executeTimes = [];
			list.forEach((value, key) => {
				let executeTime = value[2];
				executeTimes[key] = { executeTime: executeTime, P: key };
			});

			executeTimes.sort(function (a, b) {
				if (a.executeTime === b.executeTime) return a.P - b.P;
				return a.executeTime - b.executeTime;
			});

			executeTimes.forEach((value, key) => {
				processComponent +=
					'<th style="height: 60px; width: ' +
					value.executeTime * 20 +
					'px;">P' +
					value.P +
					'</th>';
				timeComponent += '<td>' + value.executeTime + '</td>';
			});

			document.getElementById('result').innerHTML =
				'<table id="resultComponent" class="inner-result table table-bordered mt-5"><tr>' +
				processComponent +
				'</tr><tr>' +
				timeComponent +
				'</tr></table>';
		} else if (algorithm === 2) {
			let executeTimes = [];

			list.forEach((value, key) => {
				let executeTime = value[2];
				let priority = value[4];
				executeTimes[key] = {
					executeTime: executeTime,
					P: key,
					priority: priority,
				};
			});

			executeTimes.sort((a, b) => {
				if (a.priority === b.priority) return a.P - b.P;
				return b.priority - a.priority;
			});

			executeTimes.forEach((value, key) => {
				processComponent +=
					'<th style="height: 60px; width: ' +
					value.executeTime * 20 +
					'px;">P' +
					value.P +
					'</th>';
				timeComponent += '<td>' + value.executeTime + '</td>';
			});

			document.getElementById('result').innerHTML =
				'<table id="resultComponent" class="inner-result table table-bordered mt-5"><tr>' +
				processComponent +
				'</tr><tr>' +
				timeComponent +
				'</tr></table>';
		} else if (algorithm === 3) {
			let quantum = this.state.quantum;
			let executeTimes = [];

			list.forEach((value, key) => {
				executeTimes[key] = { executeTime: value[2], P: key };
			});

			let end = false;
			console.log(executeTimes);
			while (!end) {
				end = true;
				for (let i = 0; i < executeTimes.length; i++) {
					if (executeTimes[i].executeTime > 0) {
						processComponent +=
							'<th style="height: 60px; width: ' +
							(executeTimes[i].executeTime > quantum
								? quantum
								: executeTimes[i].executeTime) *
								20 +
							'px;">P' +
							executeTimes[i].P +
							'</th>';
						timeComponent +=
							'<td>' +
							(executeTimes[i].executeTime > quantum
								? quantum
								: executeTimes[i].executeTime) +
							'</td>';
						executeTimes[i].executeTime -= quantum;
						end = false;
					}
				}
			}

			document.getElementById('result').innerHTML =
				'<table id="resultComponent" class="inner-result table table-bordered mt-5"><tr>' +
				processComponent +
				'</tr><tr>' +
				timeComponent +
				'</tr></table>';
		}
	};

	changeQuantum = (q) => {
		this.setState({ quantum: q });
	};

	changePriority = (index, priority) => {
		let val;
		let list = this.state.processList;
		if (priority === '') {
			val = 0;
		} else {
			val = parseInt(priority);
		}
		list[index][4] = val;
		this.setState({ processList: list }, () => {
			this.recalculateServiceTime();
		});
	};

	generateTable = () => {
		let table = [];

		if (this.state.algorithm === 2) {
			this.state.processList.forEach((value, key) =>
				table.push(
					<Process
						index={key}
						key={key}
						processName={value[0]}
						arrivalTime={value[1]}
						executionTime={value[2]}
						serviceTime={value[3]}
						priority={value[4]}
						handleDelete={this.deleteRow}
						changePriority={this.changePriority}
					/>
				)
			);
		} else if (this.state.algorithm === 3) {
			this.state.processList.forEach((value, key) => {
				table.push(
					<RoundRobinProcess
						index={key}
						key={key}
						processName={value[0]}
						arrivalTime={value[1]}
						executionTime={value[2]}
						handleDelete={this.deleteRow}
					/>
				);
			});
		} else {
			this.state.processList.forEach((value, key) =>
				table.push(
					<Process
						index={key}
						key={key}
						processName={value[0]}
						arrivalTime={value[1]}
						executionTime={value[2]}
						serviceTime={value[3]}
						priority={null}
						handleDelete={this.deleteRow}
						changePriority={this.changePriority}
					/>
				)
			);
		}
		return table;
	};

	render() {
		let table = this.generateTable();
		return (
			<div>
				<Navbar
					algorithm={this.state.algorithm}
					changeAlgorithm={(a) => {
						this.setState({ algorithm: a }, () => {
							this.recalculateServiceTime();
						});
					}}
					visualize={this.draw}
					addRow={this.addRow}
					changeQuantum={this.changeQuantum}
				/>
				<div className='container mt-5'>
					<table className='table' id='processTable'>
						{this.state.algorithm === 2 ? (
							<tr>
								<th>Process</th>
								<th>Arrival Time</th>
								<th>Execution Time</th>
								<th>Service Time</th>
								<th>Priority</th>
								<th></th>
							</tr>
						) : this.state.algorithm === 3 ? (
							<tr>
								<th>Process</th>
								<th>Arrival Time</th>
								<th>Execution Time</th>
								<th></th>
							</tr>
						) : (
							<tr>
								<th>Process</th>
								<th>Arrival Time</th>
								<th>Execution Time</th>
								<th>Service Time</th>
								<th></th>
							</tr>
						)}
						<tbody>{table}</tbody>
					</table>
				</div>

				<div id='result' className='container result'></div>
				<p  className='timer'>Total Time : {this.state.totalTime}</p>
			</div>
		);
	}
}
