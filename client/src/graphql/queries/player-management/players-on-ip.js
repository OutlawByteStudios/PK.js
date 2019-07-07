import { gql } from 'apollo-boost';

export default gql`
  query IPSearch($serverID: Int!, $ipMask: Int!){
    server(id: $serverID){
      _id
      
      ipRecords(ipMask: $ipMask){
        ipMask
        ip
        player{
          guid
        }
      }
    }
  }
 
`;
