import { gql } from 'apollo-boost';

export default gql`
  mutation ReinstallServer($serverID: Int!){
    reinstallServer(serverID: $serverID) {
      _id
    }
  }
`;
