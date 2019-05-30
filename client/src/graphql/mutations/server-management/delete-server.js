import { gql } from 'apollo-boost';

export default gql`
  mutation DeleteServer($serverID: Int!){
    deleteServer(serverID: $serverID) {
      _id
    }
  }
`;
