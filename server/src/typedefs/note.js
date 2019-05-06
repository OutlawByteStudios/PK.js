import { gql } from 'apollo-server-koa';

export default gql`
  type Note {
    server: Int
    player: Player

    note: String

    date: Date

    admin: SteamUser
  }
`;
