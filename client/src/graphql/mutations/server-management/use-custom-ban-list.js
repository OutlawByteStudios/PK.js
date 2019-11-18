import { gql } from 'apollo-boost';

export default gql`
  mutation UseCustomBanList($serverID: Int!, $on: Boolean!){
    useCustomBanList(serverID: $serverID, on: $on){
      _id
      useCustomBanList
    }
  }
`;
