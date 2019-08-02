import mongoose from 'mongoose';

const WarningSchema = new mongoose.Schema({
  server: { type: Number, require: true },
  player: { type: String, require: true },

  admin: { type: String, require: true },

  privateReason: { type: String, require: true },
  publicReason: { type: String, require: true },

  date: { type: Number, require: true, default: Date.now }
});

export default mongoose.model('Warning', WarningSchema);
