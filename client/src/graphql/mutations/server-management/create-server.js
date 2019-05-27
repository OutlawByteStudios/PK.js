import { gql } from 'apollo-boost';

import Fragments  from '../../fragments/index';

export default gql`
  mutation CreateServer($name: String!, $welcomeMessage: String){
    createServer(name: $name, welcomeMessage: $welcomeMessage){
      ...Server
    }
  }
  
  ${Fragments.Server}
`;
