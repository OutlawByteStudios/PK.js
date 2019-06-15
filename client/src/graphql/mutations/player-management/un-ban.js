import { gql } from 'apollo-boost';

export default gql`
  mutation UnBan($banID: String!){
    unBan(banID: $banID) {
      _id
      unbannedDate
    }
  }
`;
