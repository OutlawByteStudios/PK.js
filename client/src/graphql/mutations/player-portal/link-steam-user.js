import { gql } from 'apollo-boost';

export default gql`
  mutation LinkSteamUser($guid: String!, $pin: String!){
    linkSteamUser(guid: $guid, pin: $pin){
        _id
        guid
        
        server {
          _id
          id
          name
        } 
    }
  }
`;
