import { gql } from 'apollo-boost';

export default gql`
  mutation DeleteWarning($warningID: String!, $reason: String!){
    deleteWarning(warningID: $warningID, reason: $reason) {
      _id
    }
  }
`;
