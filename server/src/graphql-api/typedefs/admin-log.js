import { gql } from 'apollo-server-koa';

export default gql`
  type AdminLog {
    _id: String

    server: Server
    admin: SteamUser
    
    type: String
    date: Date
    
    targetPlayer: Player
    targetAdmin: SteamUser
    
    reason: String
    
    length: Int
    
    amount: Int
    from: String
    
    name: String
  }
`;
