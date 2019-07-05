import { gql } from 'apollo-boost';

export default gql`
  mutation RenameServer($serverID: Int!, $name: String!){
    renameServer(serverID: $serverID, name: $name){
      _id
      name
    }
  }
`;
