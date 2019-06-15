import { gql } from 'apollo-boost';

export default gql`
  mutation DeleteBan($banID: String!, $reason: String!){
    deleteBan(banID: $banID, reason: $reason) {
      _id
    }
  }
`;
