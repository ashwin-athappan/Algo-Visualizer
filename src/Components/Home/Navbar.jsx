import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Navbar = ({setLoggedIn}) => {

    const logout = () => {
        window.localStorage.removeItem('user');
        setLoggedIn(false);
    }

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<h6 style={{ cursor: 'pointer' }} className='heading'>
				Algo <span className='secondary-text'>Visualizer</span>
			</h6>

			<div className='nav-item about-item' id='navbarSupportedContent'>
				<Link to={'/about'}>
					<span style={{ color: 'white' }}>About</span>
				</Link>
			</div>
			<button className='btn btn-outline-danger logout-btn' onClick={logout}>Logout</button>
		</nav>
	);
};

export default Navbar;
