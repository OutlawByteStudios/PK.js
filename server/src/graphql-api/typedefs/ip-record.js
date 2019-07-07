import { gql } from 'apollo-server-koa';

export default gql`
  type IPRecord {
    _id: String
    
    ip: String
    ipMask: Int
    
    server: Server
    player: Player
    
    lastSeen: Date
  }
`;
