import mongoose from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const IPMaskSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  ip: { type: String, require: true },
  firstSeen: { type: String, require: true, default: Date.now }
});

IPMaskSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'ipMaskID' });

export default mongoose.model('IPMask', IPMaskSchema);
