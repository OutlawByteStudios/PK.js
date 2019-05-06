import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    server: {
      type: Number,
      require: true
    },

    player: {
      type: String,
      require: true
    },

    note: {
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

export default mongoose.model('Note', NoteSchema);
