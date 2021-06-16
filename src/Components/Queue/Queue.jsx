import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';

import './styles/queue.css';

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

class Queue extends Component {
	state = {
		queue: [],
	};

	enqueue = (value) => {
		let temp = this.state.queue;
		temp.indexOf(value) === -1
			? temp.push(value)
			: console.log('already exists');
		console.log(temp);
		this.setState({
			queue: temp,
		});
	};

	dequeue = () => {
		let temp = this.state.queue;
		temp.shift();
		this.setState({
			queue: temp,
		});
	};

	dequeueAll = async () => {
		let temp = this.state.queue;
		while (temp.length > 0) {
			temp = this.state.queue;
			temp.shift()
			this.setState(
				{
					queue: temp,
				},
				await sleep(500)
			);
		}
	}

	render() {
		return (
			<>
				<Navbar enqueue={this.enqueue} dequeue={this.dequeue} dequeueAll={this.dequeueAll} />
				<div className='container mt-5'>
					<ul className='queue'>
						{this.state.queue.length > 0 ? (
							this.state.queue.map((item, index) => (
								<li className='element' key={index}>
									{item}{' '}
								</li>
							))
						) : (
							<div className='empty'>Empty Queue</div>
						)}
					</ul>
				</div>
			</>
		);
	}
}

export default Queue;
