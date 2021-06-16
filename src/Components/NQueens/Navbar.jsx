import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DiscreteSlider from './slider';

import './style.css'

class Navbar extends Component {
	render() {
		return (
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<Link style={{ textDecoration: 'none' }} to={'/'}>
					<span className='navbar-brand'> {'◀'} </span>
				</Link>
				<div className='navbar-brand'>
					N Queens{' '}
					<span style={{ color: '#4039ad', fontWeight: 'bold' }}>
						Visualizer
					</span>
				</div>
				<div className='items'>
					<button
						className='btn btn-secondary m-2'
						onClick={this.props.onClear}
						disabled={this.props.disable}
						style={this.isClickable()}
					>
						Clear Board
					</button>

					<DiscreteSlider
						default={4}
						min={1}
						max={8}
						step={1}
						title='Grid size'
						onCountChange={this.props.onCountChange}
						disable={this.props.disable}
					/>
					<DiscreteSlider
						default={50}
						min={1}
						max={100}
						step={1}
						title='Speed'
						onCountChange={this.props.onSpeedChange}
					/>

					<button
						className='btn btn-success m-2'
						onClick={this.props.onViusalize}
						disabled={this.props.disable}
						style={this.isClickable()}
					>
						Visualize
					</button>
				</div>
			</nav>
		);
	}

	isClickable = () => {
		if (this.props.disable) {
			return { cursor: 'not-allowed' };
		} else {
			return {};
		}
	};
}

export default Navbar;
