import { gql } from 'apollo-boost';

export default gql`
  mutation SaveCustomBanList($serverID: Int!, $customBanList: String!){
    saveCustomBanList(serverID: $serverID, customBanList: $customBanList){
      _id
      customBanList
    }
  }
`;
