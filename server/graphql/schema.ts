import {gql} from 'apollo-server-express';

export default gql`
    type User {
        id: ID!
        displayName: String!,
        steam: Steam!,
        csgoStat: CSGOStat
    }

    type Steam {
        lvl: String,
        steamid: String
        avatarfull: String
        profileurl: String
        trustRating: String
        timecreated: String
    }

    type Session {
        user: User
        csrf: String!
        url: String
    }

    type CSGOStat {
        playtime_forever: Int
        total_time_played: Int
        playtime_2weeks: Int
    }

    type Query {
        users: [User]
        user: User!
        session: Session!
    }
`;