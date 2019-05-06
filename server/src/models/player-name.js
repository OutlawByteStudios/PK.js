import mongoose from 'mongoose';

const PlayerNameSchema = new mongoose.Schema(
  {
    server: {
      type: Number,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    player: {
      type: String,
      require: true
    },
    lastSeen: {
      type: Date,
      default: new Date()
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('PlayerName', PlayerNameSchema);
