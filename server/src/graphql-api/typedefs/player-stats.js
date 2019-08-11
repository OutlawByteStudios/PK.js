import { gql } from 'apollo-server-koa';

export default gql`
  type PlayerStats {
    _id: String

    server: Server
    player: Player
    date: Date

    totalGold: Int
  }
`;
