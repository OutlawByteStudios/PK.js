import React from 'react';
import { Input } from 'reactstrap';

class Component extends React.Component{
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    event.preventDefault();

    this.props.onChange(event.target.value)
  }

  render(){
    return (
      <Input
        type="select"
        onChange={this.onChange}
        value={this.props.selectedAdmin || 'Select an Admin...'}
      >
        <option className="text-default" value={'Select an Admin...'}>Select an Admin...</option>
        {
          this.props.admins.map((admin, key) => (
            <option
              className="text-default"
              value={admin.steamID}
              key={key}
            >
              {admin.displayName}
            </option>
          ))
        }
      </Input>
    );
  }
}

export default Component;