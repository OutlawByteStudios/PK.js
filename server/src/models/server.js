import mongoose from 'mongoose';
import crypto from 'crypto';

import serverConfig from '../../server-config';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const ServerSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  name: { type: String, require: true },

  welcomeMessage: {
    type: String,
    require: true,
    default: 'Welcome to a PK.js powered server.'
  },

  defaultBankGold: {
    type: Number,
    require: true,
    default: 150000
  },
  defaultPouchGold: {
    type: Number,
    require: true,
    default: 10000
  },
  defaultBankLimit: {
    type: Number,
    require: true,
    default: 1000000
  },

  recordStats: {
    type: Boolean,
    require: true,
    default: false
  },

  apiKey: {
    type: String,
    require: true,
    default: () => crypto.randomBytes(20).toString('hex')
  },

  gameserverLastModule: String,
  gameserverLastConfig: String,

  gameserverRestartCron: {
    type: String,
    default: serverConfig.gameserverRestartCron
  },

  useCustomBanList: {
    type: Boolean,
    default: false
  }
});
ServerSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'serverID' });

export default mongoose.model('Server', ServerSchema);
