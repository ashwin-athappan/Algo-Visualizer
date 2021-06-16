import SimpleSelect from './SimpleSelect';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({ startSearch, changeAlgorithm, reset, randomize }) => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link style={{ textDecoration: 'none' }} to={'/'}>
				<span className='navbar-brand'> {'◀'} </span>
			</Link>
			<div className='navbar-brand'>Searching <span style={{color:  '#4039ad', fontWeight: 'bold'}}>Visualizer</span></div>
			<SimpleSelect changeAlgorithm={changeAlgorithm} />
			<button className='btn btn-outline-success m-2' onClick={startSearch}>
				Visualize
			</button>
			<button className='btn btn-outline-primary m-2' onClick={reset}>
				Reset
			</button>
			<button className='btn btn-outline-warning m-2' onClick={randomize}>
				Randomize
			</button>
		</nav>
	);
};

export default Navbar;
