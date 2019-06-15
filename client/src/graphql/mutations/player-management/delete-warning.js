import { gql } from 'apollo-boost';

export default gql`
  mutation DeleteWarning($warningID: String!){
    deleteWarning(warningID: $warningID) {
      _id
    }
  }
`;
