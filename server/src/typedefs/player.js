import { gql } from 'apollo-server-koa';

export default gql`
  type Player {
    server: Int
    guid: String
    online: Int
    lastSeen: Date
    factionID: Int
    classID: Int
    pouchGold: Int
    bankGold: Int
    bankLimit: Int
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

    playerNames: [PlayerName]

    bans: [Ban]
    warnings: [Warning]
    notes: [Note]
  }
`;
