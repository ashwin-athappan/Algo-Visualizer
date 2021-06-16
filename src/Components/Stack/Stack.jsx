import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';

import './styles/stack.css';

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

class Stack extends Component {
	state = {
		stack: [],
	};

	push = (value) => {
		let temp = this.state.stack;
		temp.indexOf(value) === -1
			? temp.splice(0, 0, value)
			: console.log('already exists');
		this.setState({
			stack: temp,
		});
	};

	pop = () => {
		let temp = this.state.stack;
		temp.shift();
		this.setState({
			stack: temp,
		});
	};

	popAll = async () => {
		let temp = this.state.stack;
		while (temp.length > 0) {
			temp = this.state.stack;
			temp.shift()
			this.setState(
				{
					stack: temp,
				},
				await sleep(500)
			);
		}
	};

	render() {
		return (
			<>
				<Navbar push={this.push} pop={this.pop} popAll={this.popAll} />
				<div className='container mt-5'>
					<ul className='stack'>
						{this.state.stack.length > 0 ? (
							this.state.stack.map((item, index) =>
								index === 0 ? (
									<li className='element top' key={index}>
										{item} <div className='arrow'>↵</div>
									</li>
								) : (
									<li className='element' key={index}>
										{item}{' '}
									</li>
								)
							)
						) : (
							<div className='empty'>Empty Stack</div>
						)}
					</ul>
				</div>
			</>
		);
	}
}

export default Stack;
