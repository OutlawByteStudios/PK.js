import React from 'react';
import { withRouter } from 'react-router-dom';

import { Input } from 'reactstrap';

class Component extends React.Component {
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
      <Input
        type="select"
        className={this.props.className}
        onChange={this.onChange}
        value={this.props.match.params.serverID || 'Select a Server...'}
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

export default withRouter(Component);