import { gql } from 'apollo-boost';

import Fragments  from '../../fragments/index';

export default gql`
  mutation CreateServer(
    $name: String!, 
    $welcomeMessage: String,
    $defaultBankGold: Int,
    $defaultPouchGold: Int,
    $defaultBankLimit: Int,
    $gameserverRestartCron: String,
    $steamID: String!
  ){
    createServer(
      name: $name, 
      welcomeMessage: $welcomeMessage,
      defaultBankGold: $defaultBankGold,
      defaultPouchGold: $defaultPouchGold,
      defaultBankLimit: $defaultBankLimit,
      gameserverRestartCron: $gameserverRestartCron
    ){
      ...Server
      
      adminPermission(steamID: $steamID){
        ...AdminPermission
      }
    }
  }
  
  ${Fragments.Server}
  ${Fragments.AdminPermission}
`;
