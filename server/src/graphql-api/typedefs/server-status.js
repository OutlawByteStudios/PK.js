import { gql } from 'apollo-server-koa';

export default gql`
  type ServerStatus {
    _id: String

    Name: String
    ModuleName: String
    MultiplayerVersionNo: Int
    ModuleVersionNo: Int
    MapID: Int
    MapName: String
    MapTypeID: String
    MapTypeName: String
    NumberOfActivePlayers: Int
    MaxNumberOfPlayers: Int
    HasPassword: Boolean
    IsDedicated: Boolean
    HasSteamAntiCheat: Boolean
  }
`;
