import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  mutation StripPlayer($serverID: Int!, $guid: String!, $reason: String!){
    stripPlayer(serverID: $serverID, guid: $guid, reason: $reason) {
        _id
        
        headArmour {
          ...Item
        }
        bodyArmour {
          ...Item
        }
        footArmour {
          ...Item
        }
        handArmour {
          ...Item
        }
        firstItem {
          ...Item
        }
        secondItem {
          ...Item
        }
        thirdItem {
          ...Item
        }
        forthItem {
          ...Item
        }
        
        horse {
          ...Item
        }
        horseHealth
        
        health
        food
        poison   
    }
  }
  
  ${Fragments.Item}
`;
