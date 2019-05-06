import mongoose from 'mongoose';

const BanSchema = new mongoose.Schema(
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

    startDate: {
      type: Date,
      require: true,
      default: Date.now
    },
    endDate: {
      type: Date,
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

export default mongoose.model('Ban', BanSchema);
