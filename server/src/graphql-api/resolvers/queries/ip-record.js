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

      if(filter.ipLike) query.$where = `function(){ return this.ip.includes('${filter.ipLike}') || this.id.toString().includes('${filter.ipLike}'); }`;

      if(filter.ipMask) query.ipMask = filter.ipMask;

      let ipRecords = await IPRecord.find(query);

      if(filter.ipLike){
        ipRecords = ipRecords.filter((record, index, self) => self.findIndex(r => r.ipMask === record.ipMask) === index);
      }

      return ipRecords;
    }

  }
};
