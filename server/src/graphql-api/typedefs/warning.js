import { gql } from 'apollo-server-koa';

export default gql`
  type Warning {
    _id: String

    server: Int
    player: Player

    admin: SteamUser

    publicReason: String
    privateReason: String

    date: Date
  }
`;
