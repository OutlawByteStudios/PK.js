import { gql } from 'apollo-server-koa';

export default gql`
  type SteamUser {
    steamID: String
    displayName: String
    avatar: String
    avatarMedium: String
    avatarFull: String

    panelAdmin: Boolean
  }
`;
