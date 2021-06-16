const { gql } = require('apollo-server');

const typeDefs = gql`
	type User {
		id: String
		username: String
		email: String
		password: String
	}

	type Query {
		getUsers: [User]!
	}

	type Mutation {
		register(
			username: String!
			email: String!
			password: String!
			confirmPassword: String!
		): User!
		login(username: String!, password: String!): User!
	}
`;

module.exports = typeDefs;
