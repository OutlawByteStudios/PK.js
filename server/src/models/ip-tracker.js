import mongoose from 'mongoose';

const IPTrackerSchema = new mongoose.Schema({
  ipMask: { type: String, require: true },

  player: { type: String, require: true },

  lastSeen: { type: Date, default: new Date() }
});

export default mongoose.model('IPTracker', IPTrackerSchema);
