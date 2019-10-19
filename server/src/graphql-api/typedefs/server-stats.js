import { gql } from 'apollo-server-koa';

export default gql`
  type ServerStats {
    _id: String

    server: Server
    date: Date

    uniqueGUIDs: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    uniqueIPs: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")

    adminCount: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")

    totalBans: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    totalWarnings: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    totalNotes: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")

    playerCount: Int
    currentMap: String
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")

    totalGold: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    totalBankGold: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    totalPouchGold: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    bankLimit: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
  }
`;
