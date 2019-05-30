import { gql } from 'apollo-boost';

import Fragments  from '../../fragments/index';

export default gql`
  mutation CreateServer($name: String!, $welcomeMessage: String, $steamID: String){
    createServer(name: $name, welcomeMessage: $welcomeMessage){
      ...Server
      
      adminPermission(steamID: $steamID){
        ...AdminPermission
      }
    }
  }
  
  ${Fragments.Server}
  ${Fragments.AdminPermission}
`;
