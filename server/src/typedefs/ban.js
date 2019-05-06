import { gql } from 'apollo-server-koa';

export default gql`
  type Ban {
    server: Int
    player: Player

    privateReason: String
    publicReason: String

    startDate: Date
    endDate: Date

    admin: SteamUser
  }
`;
