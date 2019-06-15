import { gql } from 'apollo-boost';

export default gql`
  mutation AdjustGold($serverID: Int!, $guid: String!, $amount: Int!, $remove: Boolean, $pouch: Boolean, $reason: String!){
    adjustGold(serverID: $serverID, guid: $guid, amount: $amount, remove: $remove, pouch: $pouch, reason: $reason) {
      _id
      bankGold
      pouchGold
    }
  }
`;
