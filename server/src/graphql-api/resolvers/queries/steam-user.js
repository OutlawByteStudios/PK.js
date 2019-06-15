import { SteamUser } from '../../../models';

export default {
  Query: {
    steamuser: async (parent, filter) => {
      return SteamUser.findOne({ steamID: filter.steamID });
    }
  },
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
  AdminLog: {
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
