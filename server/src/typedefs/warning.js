import { gql } from 'apollo-server-koa';

export default gql`
  type Warning {
    server: Int
    player: Player

    privateReason: String
    publicReason: String

    date: Date

    admin: SteamUser
  }
`;
