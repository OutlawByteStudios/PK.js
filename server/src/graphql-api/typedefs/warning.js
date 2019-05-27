import { gql } from 'apollo-server-koa';

export default gql`
  type Warning {
    _id: String
    
    server: Int
    player: Player
    
    admin: SteamUser

    privateReason: String
    publicReason: String

    date: Date
  }
`;
