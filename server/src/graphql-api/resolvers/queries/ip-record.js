import { AdminPermission, IPRecord } from '../../../models';

export default {
  Player: {
    ipRecords: async parent => {
      return IPRecord.find({ player: parent.guid, server: parent.server });
    },
    ipLinkedRecords: async parent => {
      const usedIPs = (
        await IPRecord.find({
          server: parent.server,
          player: parent.guid
        })
      ).map(record => record.ip);

      return IPRecord.find({ server: parent.server, ip: { $in: usedIPs } });
    }
  },

  Server: {
    ipRecords: async (parent, filter, context) => {
      let query = { server: parent.id };

      if (filter.ipLike) {
        const adminPermission = await AdminPermission.findOne({
          server: parent.id,
          admin: context.user,
          viewIPs: { $gt: 0 }
        });

        if (adminPermission === null) {
          query.$where = `function(){ return this.ipMask.toString().includes('${filter.ipLike}'); }`;
        } else {
          query.$where = `function(){ return this.ip.includes('${filter.ipLike}') || this.ipMask.toString().includes('${filter.ipLike}'); }`;
        }
      }

      if (filter.ipMask) query.ipMask = filter.ipMask;

      let ipRecords = await IPRecord.find(query);

      if (filter.ipLike) {
        ipRecords = ipRecords.filter(
          (record, index, self) =>
            self.findIndex(r => r.ipMask === record.ipMask) === index
        );
      }

      return ipRecords;
    }
  }
};
