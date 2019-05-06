import mongoose from 'mongoose';

const WarningSchema = new mongoose.Schema(
  {
    server: {
      type: Number,
      require: true
    },

    player: {
      type: String,
      require: true
    },

    privateReason: {
      type: String,
      require: true
    },
    publicReason: {
      type: String,
      require: true
    },

    date: {
      type: Number,
      require: true
    },

    admin: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Warning', WarningSchema);
