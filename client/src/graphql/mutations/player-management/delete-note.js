import { gql } from 'apollo-boost';

export default gql`
  mutation DeleteNote($noteID: String!, $reason: String!){
    deleteNote(noteID: $noteID, reason: $reason) {
      _id
    }
  }
`;
