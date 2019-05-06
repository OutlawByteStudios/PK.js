import { gql } from 'apollo-server-koa';

export default gql`
  type PlayerName {
    server: Int
    name: String
    player: Player
    lastSeen: Date
  }
`;
