import { SteamUser } from '../../../models';

export default {
  Query: {
    steamUser: async (parent, filter) => {
      return SteamUser.findOne({ steamID: filter.steamID });
    },
    steamUsers: async (parent, filter) => {
      let query = {};
      if (filter.displayNameLike)
        query.displayName = new RegExp(
          '.*' + filter.displayNameLike + '.*',
          'i'
        );
      return SteamUser.find(query);
    }
  },
  Player: {
    linkedSteamUser: async parent => {
      return SteamUser.findOne({ steamID: parent.linkedSteamUser });
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
    },
    targetAdmin: async parent => {
      return SteamUser.findOne({ steamID: parent.targetAdmin });
    }
  },
  AdminPermission: {
    admin: async parent => {
      return SteamUser.findOne({ steamID: parent.admin });
    }
  }
};
