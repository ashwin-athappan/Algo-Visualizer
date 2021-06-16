import React, { Component } from 'react';

import Bar from './Bar/Bar';
import Bar2 from './Bar/Bar2';
import Navbar from './Navbar/Navbar';
import ControlPannel from './ControlPannel/ControlPannel';
import Tooltip from './Tooltip/Tooltip';

// Algorithms
import BubbleSort from './algorithms/BubbleSort';
import MergeSort from './algorithms/MergeSort';
import QuickSort from './algorithms/QuickSort';
import InsertionSort from './algorithms/InsertionSort';
import SelectionSort from './algorithms/SelectionSort';

// Icons
import PreviousIcon from '@material-ui/icons/SkipPrevious';
import NextIcon from '@material-ui/icons/SkipNext';

import 'bootstrap/dist/css/bootstrap.css';
import './Sorting.css';

export default class Sorting extends Component {
	state = {
		array1: [],
		arraySteps1: [],
		colorKey1: [],
		colorSteps1: [],
		currentStep1: 0,
		array2: [],
		arraySteps2: [],
		colorKey2: [],
		colorSteps2: [],
		currentStep2: 0,
		barCount: 10,
		delay: 500,
		algorithm1: 0,
		algorithm2: 0,
		comparisonMode: false,
	};

	ALGORITHMS = [BubbleSort, SelectionSort, InsertionSort, MergeSort, QuickSort];

	componentDidMount() {
		this.generateBars();
	}

	clearColorKey = () => {
		let blankKey = new Array(this.state.barCount).fill(0);
		this.setState({ colorKey1: blankKey, colorSteps1: [blankKey] });
	};

	clearColorKey2 = () => {
		let blankKey = new Array(this.state.barCount).fill(0);
		if (this.state.comparisonMode) {
			this.setState({ colorKey2: blankKey, colorSteps2: [blankKey] });
		}
	};

	previousStep1 = () => {
		let currentStep1 = this.state.currentStep1 - 1;
		if (currentStep1 > 0) {
			this.setState({
				currentStep1: currentStep1,
				array1: this.state.arraySteps1[currentStep1],
				colorKey1: this.state.colorSteps1[currentStep1],
			});
		}
	};

	nextStep1 = () => {
		let currentStep1 = this.state.currentStep1 + 1;
		if (currentStep1 < this.state.arraySteps1.length) {
			this.setState({
				currentStep1: currentStep1,
				array1: this.state.arraySteps1[currentStep1],
				colorKey1: this.state.colorSteps1[currentStep1],
			});
		}
	};

	previousStep2 = () => {
		let currentStep2 = this.state.currentStep2 - 1;
		if (currentStep2 > 0) {
			this.setState({
				currentStep2: currentStep2,
				array2: this.state.arraySteps2[currentStep2],
				colorKey2: this.state.colorSteps2[currentStep2],
			});
		}
	};

	nextStep2 = () => {
		let currentStep2 = this.state.currentStep2 + 1;
		if (currentStep2 < this.state.arraySteps2.length) {
			this.setState({
				currentStep2: currentStep2,
				array2: this.state.arraySteps2[currentStep2],
				colorKey2: this.state.colorSteps2[currentStep2],
			});
		}
	};

	generateRandomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	reset = async () => {
		await this.clearColorKey();

		await this.setState({
			array1: this.state.array1,
			arraySteps1: [this.state.array1],
			currentStep1: 0,
		});

		this.generateSteps();

		if (this.state.comparisonMode) {
			await this.clearColorKey2();

			await this.setState({
				array2: this.state.array2,
				arraySteps2: [this.state.array2],
				currentStep2: 0,
			});

			this.generateSteps2();
		}
	};

	generateBars = () => {
		this.clearColorKey();

		let barCount = this.state.barCount;
		let arr = [];

		for (let i = 0; i < barCount; i++) {
			arr.push(this.generateRandomNumber(50, 200));
		}

		this.setState(
			{
				array1: arr,
				arraySteps1: [arr],
				barCount: barCount,
				currentStep1: 0,
			},
			() => {
				this.generateSteps();
			}
		);

		if (this.state.comparisonMode) {
			this.clearColorKey2();
			this.setState(
				{
					array2: arr,
					arraySteps2: [arr],
					barCount: barCount,
					currentStep2: 0,
				},
				() => {
					this.generateSteps2();
				}
			);
		}
	};

	Start = () => {
		this.Start1();
		if (this.state.comparisonMode) this.Start2();
	};

	Start1 = async () => {
		let steps1 = this.state.arraySteps1;
		let colorSteps1 = this.state.colorSteps1;

		for (let i = 0; i < steps1.length; i++) {
			let currentStep1 = this.state.currentStep1;
			this.setState({
				array1: steps1[currentStep1],
				colorKey1: colorSteps1[currentStep1],
				currentStep1: currentStep1 + 1,
			});
			await sleep(this.state.delay);
			if (this.state.algorithm1 === 0) {
				await sleep(150);
			} else if (this.state.algorithm1 === 1) {
				await sleep(100);
			} else if (this.state.algorithm1 === 2) {
				await sleep(100);
			}
		}
	};

	Start2 = async () => {
		console.log('started');
		let steps2 = this.state.arraySteps2;
		let colorSteps2 = this.state.colorSteps2;

		for (let j = 0; j < steps2.length; j++) {
			let currentStep2 = this.state.currentStep2;
			this.setState({
				array2: steps2[currentStep2],
				colorKey2: colorSteps2[currentStep2],
				currentStep2: currentStep2 + 1,
			});
			if (this.state.algorithm2 === 0) {
				await sleep(100);
			} else if (this.state.algorithm2 === 1) {
				await sleep(150);
			} else if (this.state.algorithm2 === 2) {
				await sleep(150);
			}
			await sleep(this.state.delay);
		}
	};

	generateSteps = () => {
		let array1 = this.state.array1.slice();
		let steps1 = this.state.arraySteps1.slice();
		let colorSteps1 = this.state.colorSteps1.slice();

		console.log(this.state.arraySteps1);

		this.ALGORITHMS[this.state.algorithm1](array1, 0, steps1, colorSteps1);

		this.setState({
			arraySteps1: steps1,
			colorSteps1: colorSteps1,
		});
	};

	generateSteps2 = () => {
		let array2 = this.state.array2.slice();
		let steps2 = this.state.arraySteps2.slice();
		let colorSteps2 = this.state.colorSteps2.slice();

		console.log('color steps 2 ', this.state.currentStep2);

		this.ALGORITHMS[this.state.algorithm2](array2, 0, steps2, colorSteps2);

		this.setState(
			{
				arraySteps2: steps2,
				colorSteps2: colorSteps2,
			},
			() => {
				console.log(
					this.state.arraySteps1.length,
					this.state.arraySteps2.length
				);
				console.log(
					this.state.colorSteps1.length,
					this.state.colorSteps2.length
				);
			}
		);
	};

	handleChangeAlgorithm = (e, pos) => {
		if (pos === 0) {
			this.clearColorKey();
			this.setState(
				{
					algorithm1: e.target.value,
					currentStep1: 0,
					arraySteps1: [
						this.state.arraySteps1[
							this.state.currentStep1 === 0 ? 0 : this.state.currentStep1 - 1
						],
					],
				},
				() => {
					this.generateSteps();
				}
			);
		} else if (this.state.comparisonMode && pos === 1) {
			this.clearColorKey2();
			this.setState(
				{
					algorithm2: e.target.value,
					currentStep2: 0,
					arraySteps2: [
						this.state.arraySteps2[
							this.state.currentStep2 === 0 ? 0 : this.state.currentStep2 - 1
						],
					],
				},
				() => {
					console.log(this.state.colorSteps2);
					this.generateSteps2();
				}
			);
		}
	};

	changeArray = (index, value) => {
		let array1 = this.state.array1;
		array1[index] = value;
		this.setState(
			{
				array1: array1,
				arraySteps1: [array1],
				currentStep1: 0,
				array2: array1,
				arraySteps2: [array1],
				currentStep2: 0,
			},
			() => {
				this.generateSteps();
			}
		);
		if (this.state.comparisonMode) {
			this.setState(
				{
					array2: array1,
					arraySteps2: [array1],
					currentStep2: 0,
				},
				() => {
					this.generateSteps2();
				}
			);
		}
	};

	setComparisonArray = () => {
		if (this.state.comparisonMode) {
			this.setState({
				array2: this.state.array1,
				arraySteps2: this.state.arraySteps1,
				colorKey2: this.state.colorKey1,
				colorSteps2: this.state.colorSteps1,
				currentStep2: this.state.currentStep1,
				algorithm2: this.state.algorithm1,
			});
		} else {
			this.setState({
				array2: [],
				arraySteps2: [],
				colorKey2: [],
				colorSteps2: [],
				currentStep2: 0,
				algorithm2: 0,
			});
		}
	};

	handleComparisonModeChange = () => {
		this.setState(
			{
				comparisonMode: !this.state.comparisonMode,
			},
			() => {
				this.setComparisonArray();
			}
		);
	};

	handleChangeCount = (count) => {
		this.clearColorKey();
		if (this.state.comparisonMode) this.clearColorKey2();
		this.setState(
			{
				barCount: count,
			},
			() => {
				this.generateBars();
			}
		);
	};

	handleSpeedChange = (speed) => {
		switch (speed) {
			case 1:
				speed = 500;
				break;
			case 2:
				speed = 400;
				break;
			case 3:
				speed = 300;
				break;
			case 4:
				speed = 200;
				break;
			case 5:
				speed = 100;
				break;
			default:
				speed = 100;
				break;
		}
		this.setState({ delay: speed });
	};

	render() {
		let barsDiv1 = this.state.array1.map((value, index) => (
			<Bar
				key={index}
				index={index}
				length={value}
				color={this.state.colorKey1[index]}
				changeArray={this.changeArray}
			/>
		));

		let barsDiv2 = this.state.array2.map((value, index) => (
			<Bar2
				key={index}
				index={index}
				length={value}
				color={this.state.colorKey2[index]}
			/>
		));

		return (
			<div className='sorting'>
				<Navbar
					comparisonMode={this.state.comparisonMode}
					handleComparisonModeChange={this.handleComparisonModeChange}
					handleChangeAlgorithm={this.handleChangeAlgorithm}
					handleStart={this.Start}
					handleRandomize={this.generateBars}
					handleReset={this.reset}
				/>
				<div className='frame'>
					<div className='myTooltip'>
						<Tooltip algorithm={this.state.algorithm1} />
					</div>
					<div
						className='barsDiv container-custom card-custom'
						style={{ marginBottom: '70px' }}
					>
						{barsDiv1}
					</div>
					<div className='control-pannel'>
						<PreviousIcon
							style={{ cursor: 'pointer' }}
							onClick={this.previousStep1}
						/>
						<NextIcon style={{ cursor: 'pointer' }} onClick={this.nextStep1} />
					</div>
					<div className='line-break' />
					{this.state.comparisonMode ? (
						<>
							<div className='myTooltip'>
								<Tooltip algorithm={this.state.algorithm2} />
							</div>
							<div className='barsDiv container-custom card-custom'>
								{barsDiv2}
							</div>
							<div className='control-pannel'>
								<PreviousIcon
									style={{ cursor: 'pointer' }}
									onClick={this.previousStep2}
								/>
								<NextIcon
									style={{ cursor: 'pointer' }}
									onClick={this.nextStep2}
								/>
							</div>
						</>
					) : (
						<div />
					)}
				</div>
				<ControlPannel
					handleChangeCount={this.handleChangeCount}
					handleSpeedChange={this.handleSpeedChange}
				/>
			</div>
		);
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
