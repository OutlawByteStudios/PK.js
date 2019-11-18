import { Player, IPRecord, Ban } from '../../../models';

export default {
  Query: {
    linkedPlayers: async (parent, filter, context) => {
      return Player.find({
        linkedSteamUser: context.user
      });
    }
  },
  Server: {
    player: async (parent, filter) => {
      return Player.findOne({
        server: parent.id,
        guid: filter.guid
      });
    },

    players: async (parent, filter) => {
      let query = { server: parent.id };
      if (filter.guidLike)
        query.guid = new RegExp('.*' + filter.guidLike + '.*');
      return Player.find(query);
    },

    onlinePlayers: async parent => {
      return Player.find({ server: parent.id, online: { $gt: 0 } });
    },

    richestPlayers: async (parent, filter) => {
      return Player.find({
        server: parent.id
      })
        .sort({ bankGold: -1 })
        .limit(30 || filter.limit);
    }
  },

  Player: {
    ipBanned: async parent => {
      const usedIPs = (
        await IPRecord.find({
          server: parent.server,
          player: parent.guid
        })
      ).map(record => record.ip);

      const linkedGUIDs = (
        await IPRecord.find({
          server: parent.server,
          ip: { $in: usedIPs }
        })
      ).map(record => record.player);

      const linkedIPBannedGUIDs = (
        await Ban.find({
          $or: [
            {
              ipBan: true,
              player: { $in: linkedGUIDs },
              unbannedDate: null,
              startDate: { $lte: Date.now() },
              endDate: null,
              server: parent.server
            },
            {
              ipBan: true,
              player: { $in: linkedGUIDs },
              unbannedDate: null,
              startDate: { $lte: Date.now() },
              endDate: { $gt: Date.now() },
              server: parent.server
            }
          ]
        })
      ).map(ban => ban.player);

      return Player.find({
        server: parent.server,
        guid: { $in: linkedIPBannedGUIDs }
      });
    }
  },
  PlayerName: {
    player: async parent => {
      return Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },
  Ban: {
    player: async parent => {
      return Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },
  Warning: {
    player: async parent => {
      return Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },
  Note: {
    player: async parent => {
      return Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },

  IPRecord: {
    player: async parent => {
      return Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },

  AdminLog: {
    targetPlayer: async parent => {
      return Player.findOne({
        server: parent.server,
        guid: parent.targetPlayer
      });
    },
    recipientPlayer: async parent => {
      return Player.findOne({
        server: parent.server,
        guid: parent.recipientPlayer
      });
    }
  },
  AdminPermission: {
    player: async parent => {
      return Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  }
};
