import { SteamUser } from '../../models/index';

export default {
  Ban: {
    admin: async parent => {
      return SteamUser.findOne({ steamID: parent.admin });
    }
  },
  Warning: {
    admin: async parent => {
      return SteamUser.findOne({ steamID: parent.admin });
    }
  },
  Note: {
    admin: async parent => {
      return SteamUser.findOne({ steamID: parent.admin });
    }
  },
  AdminPermission: {
    admin: async parent => {
      return SteamUser.findOne({ steamID: parent.admin });
    }
  }
};
