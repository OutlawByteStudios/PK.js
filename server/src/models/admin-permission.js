import mongoose from 'mongoose';

const AdminPermission = new mongoose.Schema(
  {
    server: {
      type: Number,
      require: true
    },
    admin: {
      type: String,
      require: true
    },
    player: {
      type: String,
      require: true
    },

    manageAdminAssignPermissions: {
      type: Boolean,
      require: true,
      default: false
    },

    hasViewAdminPermissions: {
      type: Boolean,
      require: true,
      default: true
    },
    assignViewAdminPermissions: {
      type: Boolean,
      require: true,
      default: false
    }


  },
  {
    timestamps: true
  }
);

export default mongoose.model('AdminPermission', AdminPermission);
