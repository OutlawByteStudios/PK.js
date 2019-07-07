import mongoose from 'mongoose';
import paginate from 'mongoose-cursor-pagination';

const AdminLog = new mongoose.Schema({
  server: { type: Number, require: true },
  admin: { type: String, require: true },

  type: { type: String, require: true },
  date: { type: Date, default: new Date() },

  targetPlayer: String,
  targetAdmin: String,

  reason: String,

  length: Number,
  ipBanned: Boolean,

  amount: Number,
  from: String,

  name: String
});

AdminLog.plugin(paginate);

export default mongoose.model('AdminLog', AdminLog);
