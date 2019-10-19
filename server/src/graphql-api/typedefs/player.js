import { gql } from 'apollo-server-koa';

export default gql`
  type Player {
    _id: String

    server: Server

    guid: String
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )

    linkedSteamUser: SteamUser
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )

    online: Int
    lastSeen: Date
    lastPlayerName: String

    playerStats(startDate: Date, stopDate: Date): [PlayerStats]
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")

    factionID: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    classID: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    health: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    food: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    poison: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    headArmour: Item
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    bodyArmour: Item
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    footArmour: Item
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    handArmour: Item
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    firstItem: Item
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    secondItem: Item
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    thirdItem: Item
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    forthItem: Item
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    firstAmmo: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    secondAmmo: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    thirdAmmo: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    forthAmmo: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    horse: Item
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    horseHealth: Int
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )

    xPosition: Float
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    yPosition: Float
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )
    zPosition: Float
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )

    pouchGold: Int
    bankGold: Int
    bankLimit: Int

    playerNames: [PlayerName]
      @fieldViewPermission(
        requiresAdminPermission: "viewPlayerInfo"
        viewIfPlayer: true
      )

    bans: [Ban]
      @fieldViewPermission(
        requiresAdminPermission: "viewBans"
        viewIfPlayer: true
      )

    ipBanned: [Player] @fieldViewPermission(requiresAdminPermission: "viewBans")

    warnings: [Warning]
      @fieldViewPermission(
        requiresAdminPermission: "viewWarnings"
        viewIfPlayer: true
      )
    notes: [Note]
      @fieldViewPermission(
        requiresAdminPermission: "viewNotes"
        viewIfPlayer: true
      )

    ipRecords: [IPRecord]
      @fieldViewPermission(requiresAdminPermission: "viewIPRecords")

    ipLinkedRecords: [IPRecord]
      @fieldViewPermission(requiresAdminPermission: "viewIPRecords")
  }
`;
