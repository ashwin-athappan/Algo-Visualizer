import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: '#345',
		maxWidth: 490,
		fontSize: '13px',
		border: '1px solid #dadde9',
	},
}))(Tooltip);

const getTooltip = (info) => {
	switch (info) {
		case 0:
			return (
				<React.Fragment>
					<ul>
						<li>
							<Typography color='inherit'>Bubble Sort</Typography>
						</li>
						<li>
							<Typography color='inherit'>Insertion Sort</Typography>
						</li>
						<li>
							<Typography color='inherit'>Selection Sort</Typography>
						</li>
						<li>
							<Typography color='inherit'>Merge Sort</Typography>
						</li>
						<li>
							<Typography color='inherit'>Quick Sort</Typography>
						</li>
					</ul>
				</React.Fragment>
			);
			case 2:
				return (
					<React.Fragment>
						<ul>
							<li>
								<Typography color='inherit'>DFS</Typography>
							</li>
							<li>
								<Typography color='inherit'>BFS</Typography>
							</li>
							<li>
								<Typography color='inherit'>Dijkstras</Typography>
							</li>
						</ul>
					</React.Fragment>
				);
		default:
			break;
	}
};

export default function InfoTooltips({  word, info }) {
	return (
		<HtmlTooltip title={getTooltip(info)}>
			<Button>{word}</Button>
		</HtmlTooltip>
	);
}
