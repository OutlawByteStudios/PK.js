import { gql } from 'apollo-boost';

export default gql`
  query IPSearch($serverID: Int!, $search: String!){
    server(id: $serverID){
      _id
      
      ipRecords(ipLike: $search){
        ipMask
        ip
      }
    }
  }
 
`;
