import { gql } from 'apollo-server-koa';

export default gql`
  type Player {
    _id: String

    server: Int
    guid: String

    online: Int
    lastSeen: Date

    factionID: Int
    classID: Int
    health: Int
    food: Int
    poison: Int
    headArmour: Item
    bodyArmour: Item
    footArmour: Item
    handArmour: Item
    firstItem: Item
    secondItem: Item
    thirdItem: Item
    forthItem: Item
    firstAmmo: Int
    secondAmmo: Int
    thirdAmmo: Int
    forthAmmo: Int
    horse: Item
    horseHealth: Int

    xPosition: Float
    yPosition: Float
    zPosition: Float

    pouchGold: Int
    bankGold: Int
    bankLimit: Int

    playerNames: [PlayerName]

    bans: [Ban]
    warnings: [Warning]
    notes: [Note]
    
    ips: [IPRecord]
  }
`;
