import { gql } from 'apollo-server-koa';

export default gql`
  type IPRecord {
    _id: String
    
    ipMask: IPMask
    
    server: Server
    player: Player
    
    lastSeen: Date
  }
`;
