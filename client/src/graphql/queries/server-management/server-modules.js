import { gql } from 'apollo-boost';

export default gql`
  query ServerModules($serverID: Int!){
    server(id: $serverID){
      _id
      
      modules
    }
  }
`;
