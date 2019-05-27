import { gql } from 'apollo-boost';

export default gql`
  fragment SteamUser on SteamUser {
    _id
    
    steamID
    displayName
    avatar
  }
`;
