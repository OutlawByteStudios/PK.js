import { gql } from 'apollo-boost';

export default gql`
  query IPSearch($serverID: Int!, $steamID: String!, $ipMask: Int!){
    server(id: $serverID){
      _id
      
      ipRecords(ipMask: $ipMask){
        ipMask
        ip
        lastSeen
        player{
          guid
        }
      }
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewIPRecords
    }
  }
 
`;
