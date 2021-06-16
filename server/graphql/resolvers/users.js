const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { UserInputError } = require('apollo-server');

const prisma = new PrismaClient();

const validateLoginData = (username, password) => {
	let errors = {},
		valid = true;
	if (username.trim() === '') {
		errors.emessage = 'Username must not be empty';
		return [errors, false];
	}
	if (password.trim() === '') {
		errors.emessage = 'Password must not be empty';
		return [errors, false];
	}
	return [errors, true];
};

const validateRegisterData = (username, email, password, confirmPassword) => {
	let errors = {},
		valid = true;
	if (username.trim() === '') {
		errors.emessage = 'Username must not be empty';
		return [errors, false];
	}

	if (email.trim() === '') {
		errors.emessage = 'Email must not be empty';
		return [errors, false];
	}

	if (password.trim() === '') {
		errors.emessage = 'Password must not be empty';
		return [errors, false];
	}

	if (confirmPassword.trim() === '') {
		errors.emessage = 'ConfirmPassword must not be empty';
		return [errors, false];
	}

	if (confirmPassword.trim() !== password.trim()) {
		errors.emessage = 'ConfirmPassword must be the same as the password';
		return [errors, false];
	}

	return [errors, true];
};

module.exports = {
	Query: {
		async getUsers() {
			try {
				const users = await prisma.user.findMany();
				return users;
			} catch (e) {
				throw new Error(e);
			}
		},
	},

	Mutation: {
		async login(_, { username, password }) {
			let [errors, valid] = validateLoginData(username, password);

			if (!valid) {
				throw new UserInputError('Bad Input', errors);
			}

			try {
				errors = {}
				const user = await prisma.user.findUnique({
					where: { username: username },
				});

				if (!user) {
					errors.emessage = `User ${username} does not exist`;
					throw new UserInputError('Bad User', errors);
				}

				const match = await bcrypt.compare(password, user.password);

				if (!match) {
					errors.emessage = `Wrong Credentials`;
					throw new UserInputError('Authentication Failed', errors);
				}

				return user;
			} catch (err) {
				throw new UserInputError('Error', err);
			}
		},
		async register(_, { username, email, password, confirmPassword }) {
			let [errors, valid] = validateRegisterData(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('Bad Input', errors);
			}
			try {
				password = await bcrypt.hash(password, 12);
				const user = await prisma.user.create({
					data: {
						id: uuid.v4(),
						username,
						email,
						password,
					},
				});
				return user;
			} catch (err) {
				console.log(err);
				if (err.code === 'P2002') {
					err.emessage = `${err.meta.target[0]} is already in use`;
				}
				throw new UserInputError('Error', err);
			}
		},
	},
};
