import { gql } from 'apollo-boost';

export default gql`
  mutation UnBan($banID: String!, $reason: String!){
    unBan(banID: $banID, reason: $reason) {
      _id
      unbannedDate
    }
  }
`;
