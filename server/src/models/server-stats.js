import mongoose from 'mongoose';

const ServerStats = new mongoose.Schema({
  server: { type: Number, require: true },
  date: { type: Date, default: Date.now },

  uniqueGUIDs: Number,
  uniqueIPs: Number,

  adminCount: Number,

  totalBans: Number,
  totalWarnings: Number,
  totalNotes: Number,

  playerCount: Number,
  currentMap: String,

  totalGold: Number,
  totalBankGold: Number,
  totalPouchGold: Number,
  bankLimit: Number
});

export default mongoose.model('ServerStat', ServerStats);
