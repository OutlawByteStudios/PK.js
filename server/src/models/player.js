import mongoose from 'mongoose';

import gameConfig from '../../game-config';

const PlayerSchema = new mongoose.Schema(
  {
    server: { type: Number, require: true },
    guid: { type: String, require: true },

    online: { type: Number, default: 0 },
    lastSeen: { type: Date, default: new Date() },

    factionID: Number,
    classID: Number,
    health: Number,
    food: Number,
    poison: Number,
    headArmour: Number,
    bodyArmour: Number,
    footArmour: Number,
    handArmour: Number,
    firstItem: Number,
    secondItem: Number,
    thirdItem: Number,
    forthItem: Number,
    firstAmmo: Number,
    secondAmmo: Number,
    thirdAmmo: Number,
    forthAmmo: Number,
    horse: Number,
    horseHealth: Number,

    xPosition: Number,
    yPosition: Number,
    zPosition: Number,

    pouchGold: { type: Number, default: gameConfig.pouchGoldDefault },
    bankGold: { type: Number, default: gameConfig.bankGoldDefault },
    bankLimit: { type: Number, default: gameConfig.bankLimit }
  }
);

export default mongoose.model('Player', PlayerSchema);
