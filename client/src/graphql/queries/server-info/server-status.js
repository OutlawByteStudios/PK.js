import { gql } from 'apollo-boost';

export default gql`
  query ServerStatus($serverID: Int!){
    server(id: $serverID){
      _id
      
      serverStatus{
        _id
        Name
        ModuleName
        MapName
        NumberOfActivePlayers
        MaxNumberOfPlayers
        HasPassword
      }
    }
  }
`;
