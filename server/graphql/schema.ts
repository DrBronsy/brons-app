import {gql} from 'apollo-server-express';

export default gql`
    type User {
        id: ID!
        displayName: String,
        steam: Steam
    }

    type Steam {
        lvl: String,
        steamid: String,
    }

    type Query {
        users: [User]
        user: User!
    }
`;