import mongoose from 'mongoose';
import crypto from 'crypto';

import serverConfig from '../../server-config';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const ServerSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  name: { type: String, require: true },

  apiKey: {
    type: String,
    require: true,
    default: () => crypto.randomBytes(20).toString('hex')
  },

  welcomeMessage: {
    type: String,
    require: true,
    default: 'Welcome to a PK.js powered server.'
  },

  gameserverLastModule: String,
  gameserverLastConfig: String,

  gameserverDisableWSE: {
    type: Boolean,
    default: false
  },

  gameserverRestartCron: {
    type: String,
    default: serverConfig.gameserverRestartCron
  }
});
ServerSchema.plugin(AutoIncrement, { inc_field: 'id' });

export default mongoose.model('Server', ServerSchema);
