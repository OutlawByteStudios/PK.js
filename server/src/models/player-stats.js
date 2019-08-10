import mongoose from 'mongoose';

const PlayerStats = new mongoose.Schema({
  server: { type: Number, require: true },
  player: { type: String, requie: true },
  date: { type: Date, default: Date.now },

  totalGold: Number
});

export default mongoose.model('PlayerStat', PlayerStats);
