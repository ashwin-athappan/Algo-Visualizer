import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 490,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}))(Tooltip);

const getTooltip = (algorithm) => {
	switch (algorithm) {
		case 0:
			return (
				<React.Fragment>
					<Typography color='inherit'>Bubble Sort</Typography>
					<ol>
						<li>Compare a pair of adjacent items (a, b),</li>
						<li>
							Swap that pair if the items are out of order (in this case, when a
							> b),
						</li>
						<li>
							Repeat Step 1 and 2 until we reach the end of array (the last pair
							is the (N-2)-th and (N-1)-th items as we use 0-based indexing),
						</li>
						<li>
							By now, the largest item will be at the last position. We then
							reduce N by 1 and repeat Step 1 until we have N = 1.
						</li>
					</ol>
					<p>
						Time Complexity: O(n<sup>2</sup>)
					</p>
				</React.Fragment>
			);
		case 1:
			return (
				<React.Fragment>
					<Typography color='inherit'>Selection Sort</Typography>
					<ol>
						<li>
							Find the position X of the smallest item in the range of
							[L...N−1],
						</li>
						<li>Swap X-th item with the L-th item,</li>
						<li>
							Increase the lower-bound L by 1 and repeat Step 1 until L = N-2.
						</li>
					</ol>
					<p>
						Time Complexity: O(n<sup>2</sup>)
					</p>
				</React.Fragment>
			);
		case 2:
			return (
				<React.Fragment>
					<Typography color='inherit'>Insertion Sort</Typography>
					<ol>
						<li>Start with one card in your hand,</li>
						<li>
							Pick the next card and insert it into its proper sorted order,
						</li>
						<li>Repeat previous step for all cards.</li>
					</ol>
					<p>
						Time Complexity: O(n<sup>2</sup>)
					</p>
				</React.Fragment>
			);
		case 3:
			return (
				<React.Fragment>
					<Typography color='inherit'>Merge Sort</Typography>
					<ol>
						<li>
							Merge each pair of individual element (which is by default,
							sorted) into sorted arrays of 2 elements,
						</li>
						<li>
							Merge each pair of sorted arrays of 2 elements into sorted arrays
							of 4 elements, Repeat the process...,
						</li>
						<li>
							Final step: Merge 2 sorted arrays of N/2 elements (for simplicity
							of this discussion, we assume that N is even) to obtain a fully
							sorted array of N elements.
						</li>
					</ol>
					<p>Time Complexity: O(n log(n))</p>
				</React.Fragment>
			);
		case 4:
			return (
				<React.Fragment>
					<Typography color='inherit'>Quick Sort</Typography>
					<p>
						Quick Sort is another Divide and Conquer sorting algorithm (the
						other one discussed in this visualization page is Merge Sort).
					</p>
					<p>
						Divide step: Choose an item p (known as the pivot)<br></br> Then
						partition the items of a[i..j] into three parts: a[i..m-1], a[m],
						and a[m+1..j].<br></br> a[i..m-1] (possibly empty) contains items
						that are smaller than p.<br></br> a[m] is the pivot p, i.e. index m
						is the correct position for p in the sorted order of array a.
						<br></br> a[m+1..j] (possibly empty) contains items that are greater
						than or equal to p.<br></br> Then, recursively sort the two parts.
						<br></br>Conquer step: Don't be surprised... We do nothing :O!
					</p>
				</React.Fragment>
			);
		default:
			break;
	}
};

export default function InfoTooltips({ algorithm }) {
	return (
		<div>
			<HtmlTooltip title={getTooltip(algorithm)}>
				<Button>INFO</Button>
			</HtmlTooltip>
		</div>
	);
}
