import { gql } from 'apollo-server-koa';

export default gql`
  type ServerStats {
    _id: String

    server: Server
    date: Date

    uniqueGUIDs: Int
    uniqueIPs: Int

    adminCount: Int

    totalBans: Int
    totalWarnings: Int
    totalNotes: Int

    playerCount: Int
    currentMap: String

    totalGold: Int
    totalBankGold: Int
    totalPouchGold: Int
    bankLimit: Int
  }
`;
