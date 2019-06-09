import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  mutation AddNote($serverID: Int!, $guid: String!, $note: String!){
    addNote(serverID: $serverID, guid: $guid, note: $note) {
      _id
      
      admin {
        ...SteamUser
      }
      
      note
      date
    }
  }
  
  ${Fragments.SteamUser}
`;
