import mongoose from 'mongoose';

import { panelPermissions, gamePermissions } from 'shared/constants';

const addPermissions = () => {
  let permissions = {};
  for (let permission of panelPermissions.concat(gamePermissions)) {
    permissions[permission.permission] = {
      type: Number,
      require: true,
      default: 0,
      min: 0,
      max: 2
    };
  }
  return permissions;
};

const AdminPermission = new mongoose.Schema({
  server: { type: Number, require: true },
  admin: { type: String, require: true },
  player: { type: String, require: true },

  ...addPermissions()
});

export default mongoose.model('AdminPermission', AdminPermission);
