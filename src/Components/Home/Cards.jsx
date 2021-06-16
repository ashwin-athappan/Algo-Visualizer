import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import ImgMediaCard from './Card/Card';
import { getDetails } from './cardDetails';

export default class Cards extends Component {
	state = {
		cards: [],
		filter: '',
	};

	componentDidMount() {
		this.setState({ cards: getDetails() });
	}

	getData = (e) => {
		console.log(e.target.value);
		this.setState({ filter: e.target.value });
	};

	render() {
		return (
			<>
				<div className="cards-container">
					<div className='d-flex justify-content-center search-bar Cards'>
						<TextField
							id='standard-basic'
							label='Search'
							color='primary'
							onChange={this.getData}
						/>
					</div>
					<div className='d-flex flex-wrap justify-content-center Cards p-lg-5'>
						{this.state.cards
							.filter((card) =>
								card.title
									.toLowerCase()
									.includes(this.state.filter.toLowerCase())
							)
							.map((card) => (
								<div key={card.id}>
									<ImgMediaCard className='d-flex flex-wrap' card={card} />
								</div>
							))}
					</div>
				</div>
			</>
		);
	}
}
