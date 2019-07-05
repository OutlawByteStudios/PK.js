import { gql } from 'apollo-boost';

export default gql`
  mutation ClearPlayerLocations($serverID: Int!){
    clearPlayerLocations(serverID: $serverID) {
      _id
      xPosition
      yPosition
      zPosition
    }
  }
`;
