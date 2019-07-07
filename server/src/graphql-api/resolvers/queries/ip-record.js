import { IPRecord } from '../../../models';

export default {
  Player: {
    ipRecords: async (parent) => {
      return IPRecord.find({ player: parent.guid, server: parent.server });
    }
  },

  Server: {
    ipRecords: async (parent, filter) => {
      let query = {};
      if(filter.ipMask) query.ipMask = filter.ipMask;
      return IPRecord.find(query);
    }

  }
};
