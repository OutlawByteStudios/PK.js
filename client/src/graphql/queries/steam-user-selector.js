import { gql } from 'apollo-boost';

import Fragments from '../fragments';

export default gql`
  query SteamUserSelector($displayNameLike: String){
    steamUsers(displayNameLike: $displayNameLike){
      ...SteamUser
    }
  }
  
  ${Fragments.SteamUser}
`;
