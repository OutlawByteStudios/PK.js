import { IPRecord } from '../../../models';

export default {
  Player: {
    ips: async (parent) => {
      console.log(parent);
      return IPRecord.find({ player: parent.guid, server: parent.server });
    }
  }
};
