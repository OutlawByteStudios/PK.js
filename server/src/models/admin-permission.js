import mongoose from 'mongoose';

const permission = {
  type: Number,
  require: true,
  default: 0,
  min: 0,
  max: 2
};

const AdminPermission = new mongoose.Schema({
  server: { type: Number, require: true },
  admin: { type: String, require: true },
  player: { type: String, require: true },

  manageAssignPermissions: permission,
  viewAdminPermissions: permission,

  adminTools: permission,
  adminPanel: permission,
  adminMute: permission,
  adminKick: permission,
  adminTemporaryBan: permission,
  adminPermanentBan: permission,
  adminKillFade: permission,
  adminFreeze: permission,
  adminSpectate: permission,
  adminTeleport: permission,
  adminHealSelf: permission,
  adminGodlike: permission,
  adminJoinFactions: permission,
  adminAnnouncements: permission,
  adminPolls: permission,
  adminShips: permission,
  adminGold: permission,
  adminItems: permission,
  adminAllItems: permission,
  adminFactions: permission,
  adminAnimals: permission
});

export default mongoose.model('AdminPermission', AdminPermission);
