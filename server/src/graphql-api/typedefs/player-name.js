import { gql } from 'apollo-server-koa';

export default gql`
  type PlayerName {
    _id: String

    server: Int
    name: String

    player: Player

    lastSeen: Date
  }
`;
