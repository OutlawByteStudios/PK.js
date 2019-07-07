import { gql } from 'apollo-boost';

export default gql`
  query PlayerIPs($serverID: Int!, $guid: String!){
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
      }
    }
  }
`;
