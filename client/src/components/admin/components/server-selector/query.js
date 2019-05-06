import { gql } from "apollo-boost";

export default gql`
  query ServerSelector($steamID: String){
    adminPermission(admin: $steamID){
      server {
        id
        name
      }
    }
  }
`;