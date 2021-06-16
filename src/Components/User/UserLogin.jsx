import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import './styles/loginStyles.css';

function UserLogin({ setLoggedIn, setLoggedInUser }) {
	const [errors, setErrors] = useState({});

	const [registerUsername, setRegisterUsername] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [registerConfirm, setRegisterConfirm] = useState('');

	const [loginUsername, setLoginUsername] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

	const [rightPanelActive, setRightPanelActive] = useState(false);

	const REGISTER = gql`
		mutation register(
			$username: String!
			$email: String!
			$password: String!
			$confirmPassword: String!
		) {
			register(
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			) {
				id
				username
				email
			}
		}
	`;

	const LOGIN = gql`
		mutation login($username: String!, $password: String!) {
			login(username: $username, password: $password) {
				id
				username
				email
			}
		}
	`;

	let history = useHistory();

	const [registerUser, { loadingRegister }] = useMutation(REGISTER, {
		update(proxy, result) {
			console.log(loadingRegister);
			setRegistrationSuccessful(true);
		},
		onError(err) {
			const e = err.graphQLErrors[0].extensions.emessage;
			console.log(e);
			switch (e.split(' ')[0]) {
				case 'Username':
					setErrors({ Username: e });
					break;
				case 'Email':
					setErrors({ Email: e });
					break;
				case 'email':
					setErrors({ Email: e });
					break;
				case 'Password':
					setErrors({ Password: e });
					break;
				case 'ConfirmPassword':
					setErrors({ ConfirmPassword: e });
					break;
				default:
					break;
			}
		},
		variables: {
			username: registerUsername,
			email: registerEmail,
			password: registerPassword,
			confirmPassword: registerConfirm,
		},
	});

	const [loginUser, { loadingLogin }] = useMutation(LOGIN, {
		update(proxy, result) {
			setLoggedIn(true);
			console.log(loadingLogin);
			setLoggedInUser(result.data.login.username)
			window.localStorage.setItem('user', result.data.login.username);
			history.replace('');
		},
		onError(err) {
			const e = err.graphQLErrors[0].extensions.emessage;
			switch (e.split(' ')[0]) {
				case 'Username':
					setErrors({ Username: e });
					break;
				case 'Password':
					setErrors({ Password: e });
					break;
				case 'User':
					setErrors({ User: e });
					break;
				case 'Wrong':
					setErrors({ Wrong: e });
					break;
				default:
					break;
			}
		},
		variables: {
			username: loginUsername,
			password: loginPassword,
		},
	});

	const register = (e) => {
		e.preventDefault();
		registerUser();
	};

	const login = (e) => {
		e.preventDefault();
		loginUser();
	};

	return (
		<div className='body'>
			<div
				className={
					rightPanelActive
						? 'container-login right-panel-active'
						: 'container-login'
				}
				id='container'
			>
				<div className='form-container sign-up-container'>
					<form action='#'>
						<h1>Create Account</h1>
						<div className='social-container'>
							<i></i>
							<i></i>
							<i></i>
						</div>
						<input
							className={errors.Username ? 'error' : ''}
							type='text'
							value={registerUsername}
							onChange={(e) => setRegisterUsername(e.target.value)}
							placeholder='Username'
						/>
						<span className='error-message'>{errors.Username}</span>
						<input
							className={errors.Email ? 'error' : ''}
							type='email'
							value={registerEmail}
							onChange={(e) => setRegisterEmail(e.target.value)}
							placeholder='Email'
						/>
						<span className='error-message'>{errors.Email}</span>
						<input
							className={errors.Password ? 'error' : ''}
							type='password'
							value={registerPassword}
							onChange={(e) => setRegisterPassword(e.target.value)}
							placeholder='Password'
						/>
						<span className='error-message'>{errors.Password}</span>
						<input
							className={errors.ConfirmPassword ? 'error' : ''}
							type='password'
							value={registerConfirm}
							onChange={(e) => setRegisterConfirm(e.target.value)}
							placeholder='Confirm Password'
						/>
						<span className='error-message'>{errors.ConfirmPassword}</span>
						<button className='login-btn' onClick={register}>
							Sign Up
						</button>
					</form>
				</div>
				<div className='form-container sign-in-container'>
					<form action='#'>
						<h1>Sign in</h1>
						<div className='social-container'>
							<i></i>
							<i></i>
							<i></i>
						</div>
						<input
							className={errors.Username || errors.User ? 'error' : ''}
							type='text'
							value={loginUsername}
							onChange={(e) => setLoginUsername(e.target.value)}
							placeholder='Username'
						/>
						<span className='error-message'>{errors.Username}</span>
						<span className='error-message'>{errors.User}</span>
						<input
							className={errors.Password || errors.Wrong ? 'error' : ''}
							type='password'
							value={loginPassword}
							onChange={(e) => setLoginPassword(e.target.value)}
							placeholder='Password'
						/>
						<span className='error-message'>{errors.Password}</span>
						<span className='error-message'>{errors.Wrong}</span>
						<p>Forgot your password?</p>
						<button className='login-btn' onClick={login}>
							Sign In
						</button>
					</form>
				</div>
				<div className='overlay-container'>
					<div className='overlay'>
						<div className='overlay-panel overlay-left'>
							{registrationSuccessful?<p className='register-success alert-success'>Registration Successful</p>:''}
							<h1>Welcome Back!</h1>
							<p>
								To keep connected with us please login with your personal info
							</p>
							<button
								className='ghost login-btn'
								id='signIn'
								onClick={(e) => setRightPanelActive(false)}
							>
								Sign In
							</button>
						</div>
						<div className='overlay-panel overlay-right'>
							<h1>Hello There!</h1>
							<p>Sign Up to start visualizing algrithms and understand them better 😉</p>
							<button
								className='ghost login-btn'
								id='signUp'
								onClick={(e) => setRightPanelActive(true)}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserLogin;
