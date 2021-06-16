import React, { useState } from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Sorting from './Components/Sorting/Sorting';
import Queen from './Components/NQueens/Queen';
import GraphTraversal from './Components/GraphTraversal/GraphTraversal';
import Searching from './Components/Searching/Searching';
import BST from './Components/Tree/BST/BST';
import Home from './Components/Home/Home';
import Stack from './Components/Stack/Stack';
import Queue from './Components/Queue/Queue';
import About from './Components/About/About';
import Scheduling from './Components/Scheduling/Scheduling';
import UserLogin from './Components/User/UserLogin';

import './App.css';

function App() {

	const user = window.localStorage.getItem('user');
	
	const [loggedInUser, setLoggedInUser] = useState(user);
	const [loggedIn, setLoggedIn] = useState(user?true:false);

	return loggedIn ? (
		<div className='App'>
			<Router basename='/'>
				<Switch>
					<Route exact path='/graphtraversal' component={GraphTraversal} />
					<Route exact path='/sort' component={Sorting} />
					<Route exact path='/searching' component={Searching} />
					<Route exact path='/scheduling' component={Scheduling} />
					<Route exact path='/nqueen' component={Queen} />
					<Route exact path='/tree' component={BST} />
					<Route exact path='/stack' component={Stack} />
					<Route exact path='/queue' component={Queue} />
					<Route exact path='/about' component={About} />
					<Route exact path='/login'>
						<UserLogin setLoggedInUser={setLoggedInUser} setLoggedIn={setLoggedIn} />
					</Route>
					<Route exact path='/'>
						<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={loggedInUser} />
					</Route>
				</Switch>
			</Router>
		</div>
	) : (
		<Router basename='/'>
			<Switch>
				<Route exact path='/login'>
					<UserLogin setLoggedIn={setLoggedIn} setLoggedInUser={setLoggedInUser} />
				</Route>
			</Switch>
			<Redirect to='/login' />
		</Router>
	);
}

export default App;
