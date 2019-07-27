import { gql } from 'apollo-boost';

export default gql`
  mutation AdjustGold($serverID: Int!, $guid: String!, $type: String, $amount: Int!, $pouch: Boolean, $recipient: String, $reason: String!){
    adjustGold(serverID: $serverID, guid: $guid, type: $type, amount: $amount, pouch: $pouch, recipient: $recipient, reason: $reason) {
      _id
      bankGold
      pouchGold
    }
  }
`;
