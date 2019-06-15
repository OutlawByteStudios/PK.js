import mongoose from 'mongoose';

const AdminLog = new mongoose.Schema({
  server: { type: Number, require: true },
  admin: { type: String, require: true },

  type: { type: String, require: true },
  date: { type: Date, default: new Date() },

  targetPlayer: String,
  targetAdmin: String,

  reason: String,

  length: Number,

  amount: Number,
  from: String,

  name: String
});

export default mongoose.model('AdminLog', AdminLog);
