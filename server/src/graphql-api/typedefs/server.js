import { gql } from 'apollo-server-koa';

export default gql`
  type Server {
    _id: String

    id: Int
    name: String

    defaultBankGold: Int
    defaultPouchGold: Int
    defaultBankLimit: Int

    welcomeMessage: String

    apiKey: String

    gameserverOnline: Boolean
    gameserverLastModule: String
    gameserverLastConfig: String

    serverStatus: ServerStatus

    serverConfigFile(name: String!): ServerConfigFile
    serverConfigFiles: [ServerConfigFile]

    modules: [String]

    player(guid: String!): Player
    players(guidLike: String): [Player]
    
    ipRecords(ipMask: Int, ipLike: String): [IPRecord]

    playerName(name: String!): PlayerName
    playerNames(nameLike: String): [PlayerName]

    bans(player: String): [Ban]
    warnings(player: String): [Warning]
    notes(player: String): [Note]

    logSearch(search: [String]!, date: Date!): String

    adminPermission(steamID: String!): AdminPermission
    adminPermissions: [AdminPermission]

    adminLogs(
      admin: String
      filter: [String]
      page: Boolean
      startingAfter: String
      endingBefore: String
    ): [AdminLog]
  }
`;
