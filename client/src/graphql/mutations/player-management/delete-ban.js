import { gql } from 'apollo-boost';

export default gql`
  mutation DeleteBan($banID: String!){
    deleteBan(banID: $banID) {
      _id
    }
  }
`;
