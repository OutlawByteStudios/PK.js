import { gql } from 'apollo-server-koa';

export default gql`
  type Ban {
    _id: String
    server: Int
    player: Player

    admin: SteamUser

    privateReason: String
    publicReason: String

    startDate: Date
    endDate: Date
    unbannedDate: Date
  }
`;
