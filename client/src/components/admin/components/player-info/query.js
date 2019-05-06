import { gql } from "apollo-boost";

export default gql`
  query PlayerInfo($serverID: Int!, $guid: String!){
    server(id: $serverID){ 
      player(guid: $guid){
        guid
        pouchGold
        bankGold
        bankLimit
        headArmour {
          name
        }
        bodyArmour {
          name
        }
        footArmour {
          name
        }
        handArmour {
          name
        }
        firstItem {
          name
        }
        secondItem {
          name
        }
        thirdItem {
          name
        }
        forthItem {
          name
        }
        horse {
          name
        }
        health
        food
        poison
        
        playerNames {
          name
        }
        
        bans {
          privateReason
          publicReason
          
          startDate
          endDate
          
          admin {
            steamID
            displayName
            avatar
          }
        }
        
        warnings {
          privateReason
          publicReason
          
          date
          
          admin {
            steamID
            displayName
            avatar
          }
        }
        
        notes {
          note
          
          date
          
          admin {
            steamID
            displayName
            avatar
          }
        }
      }
    }
  }
`;