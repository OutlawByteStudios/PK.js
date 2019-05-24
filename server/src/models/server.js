import mongoose from 'mongoose';

import crypto from 'crypto';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const ServerSchema = new mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      require: true
    },
    welcomeMessage: {
      type: String,
      require: true,
      default: 'Welcome to a PK.js powered server.'
    },
    apiKey: {
      type: String,
      require: true,
      default: () => {
        return crypto.randomBytes(20).toString('hex');
      }
    }
  },
  {
    timestamps: true,
    _id: false
  }
);
ServerSchema.plugin(AutoIncrement);

export default mongoose.model('Server', ServerSchema);
