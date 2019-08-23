import { gql } from 'apollo-boost';

export default gql`
  query PlayerIPs($serverID: Int!, $steamID: String!, $guid: String!){
    server(id: $serverID){
      _id
      
      player(guid: $guid){
        _id
        
        ipRecords {
          _id
          
          ip
          ipMask
          lastSeen
        }
        
        ipLinkedRecords {
          _id
          player {
            _id
            guid
          }
          ipMask
          lastSeen
        }
      }
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewIPRecords
    }
  }
`;
