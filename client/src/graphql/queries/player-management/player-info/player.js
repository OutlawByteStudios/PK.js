import { gql } from 'apollo-boost';

import Fragments from '../../../fragments';

export default gql`
  query Player($serverID: Int!, $steamID: String!, $guid: String!){
    server(id: $serverID){
      _id
    
      player(guid: $guid){
        _id
        
        guid
        
        linkedSteamUser {
          ...SteamUser
        }
        
        online
        lastSeen
        lastPlayerName
        
        pouchGold
        bankGold
        bankLimit
        
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
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewPlayerInfo
    }
  }
 
  ${Fragments.Item}
  ${Fragments.SteamUser}
`;
