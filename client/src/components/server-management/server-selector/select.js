import React from 'react';
import { withRouter } from 'react-router-dom';

import { Input } from 'reactstrap';

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
    if (this.props.loading) return <p>Loading...</p>;
    if (this.props.errors) return <p>Error :(</p>;

    return (
      <Input
        type="select"
        className={this.props.className}
        onChange={this.onChange}
        value={this.props.serverID || 'Select a Server...'}
      >
        <option className="text-default" value={'Select a Server...'}>Select a Server...</option>
        {
          this.props.adminPermissions.map((adminPermission, key) => (
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
  }
}

export default withRouter(ServerSelectorSelect);