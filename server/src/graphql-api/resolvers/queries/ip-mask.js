import { IPMask } from '../../../models';

export default {
  IPRecord: {
    ipMask: async (parent) => {
      return IPMask.findOne({ id: parent.ipMask });
    }
  }
};
