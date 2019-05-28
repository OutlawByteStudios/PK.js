import mongoose from 'mongoose';

const SteamUserSchema = new mongoose.Schema({
  steamID: { type: String, require: true },
  displayName: { type: String, require: true },
  avatar: { type: String, require: true },
  avatarMedium: { type: String, require: true },
  avatarFull: { type: String, require: true },

  panelAdmin: { type: Boolean, require: true, default: false }
});

export default mongoose.model('SteamUser', SteamUserSchema);
