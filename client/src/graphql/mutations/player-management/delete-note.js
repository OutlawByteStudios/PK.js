import { gql } from 'apollo-boost';

export default gql`
  mutation DeleteNote($noteID: String!){
    deleteNote(noteID: $noteID) {
      _id
    }
  }
`;
