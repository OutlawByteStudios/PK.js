import { gql } from 'apollo-boost';

export default gql`
  mutation SaveConfig($serverID: Int!, $name: String!, $config: String!){
    saveServerConfig(serverID: $serverID, name: $name, config: $config){
      name
      config
    }
  }
`;
