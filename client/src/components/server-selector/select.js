import React from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from "apollo-boost";
import { Query } from 'react-apollo';

import { Input } from 'reactstrap';

import Auth from '../../utils/auth';

const QUERY = gql`
  query ServerSelector($steamID: String){
    adminPermission(admin: $steamID){
      server {
        id
        name
      }
    }
  }
`;
export { QUERY };

class ServerSelectorSelect extends React.Component {
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    if(event.target.value === 'Select a Server...') this.props.history.push('/admin');
    else this.props.history.push('/admin/' + event.target.value);
  }

  render(){
    return (
      <Query
        query={QUERY}
        variables={{ steamID: Auth.claim.steamID }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <Input
              type="select"
              className={this.props.className}
              onChange={this.onChange}
              value={this.props.serverID || 'Select a Server...'}
            >
              <option className="text-default" value={'Select a Server...'}>Select a Server...</option>
              {
                data.adminPermission.map((adminPermission, key) => (
                  <option
                    className="text-default"
                    value={adminPermission.server.id}
                    key={key}
                  >
                    {adminPermission.server.name}
                  </option>
                ))
              }
            </Input>
          );
        }}
      </Query>
    )
  }
}

export default withRouter(ServerSelectorSelect);