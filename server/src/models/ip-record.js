import mongoose from 'mongoose';

const IPRecordSchema = new mongoose.Schema({
  ipMask: { type: Number, require: true },
  server: { type: Number, require: true },
  player: { type: String, require: true },

  lastSeen: { type: Date, default: new Date() }
});

export default mongoose.model('IPRecord', IPRecordSchema);
