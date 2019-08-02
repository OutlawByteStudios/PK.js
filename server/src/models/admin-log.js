import mongoose from 'mongoose';
import paginate from 'mongoose-cursor-pagination';

const AdminLog = new mongoose.Schema({
  server: { type: Number, require: true },
  admin: { type: String, require: true },

  type: { type: String, require: true },
  date: { type: Date, default: Date.now },

  targetPlayer: String,
  targetAdmin: String,

  reason: String,

  length: Number,
  ipBanned: Boolean,

  amount: Number,
  adjustmentType: String,
  recipientPlayer: String,
  from: String,

  name: String
});

AdminLog.plugin(paginate);

export default mongoose.model('AdminLog', AdminLog);
