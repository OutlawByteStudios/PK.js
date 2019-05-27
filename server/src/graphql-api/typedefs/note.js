import { gql } from 'apollo-server-koa';

export default gql`
  type Note {
    _id: String
    server: Int
    player: Player
    
    admin: SteamUser

    note: String

    date: Date
  }
`;
