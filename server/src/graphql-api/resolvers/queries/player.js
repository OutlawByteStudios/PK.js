import { Player } from '../../../models';

export default {
  Server: {
    player: async (parent, filter) => {
      return Player.findOne({
        server: parent.id,
        guid: filter.guid
      });
    },

    players: async (parent, filter) => {
      console.log(filter);
      let query = { server: parent.id };
      if (filter.guidLike)
        query.guid = new RegExp('.*' + filter.guidLike + '.*');
      return Player.find(query);
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
