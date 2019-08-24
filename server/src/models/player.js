import mongoose from 'mongoose';

import generatePin from '../utils/generate-pin';

const PlayerSchema = new mongoose.Schema({
  server: { type: Number, require: true },
  guid: { type: String, require: true },

  pin: {
    type: String,
    require: true,
    default: generatePin
  },
  linkedSteamUser: String,

  online: { type: Number, require: true, default: 0 },
  lastSeen: { type: Date, default: Date.now },
  lastPlayerName: { type: String },

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

  pouchGold: { type: Number, require: true },
  bankGold: { type: Number, require: true },
  bankLimit: { type: Number, require: true }
});

export default mongoose.model('Player', PlayerSchema);
