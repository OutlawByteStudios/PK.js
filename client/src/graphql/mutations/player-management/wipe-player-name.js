import { gql } from 'apollo-boost';

export default gql`
  mutation WipePlayerName($serverID: Int!, $name: String!){
    wipePlayerName(serverID: $serverID, name: $name) {
      _id
    }
  }
`;
