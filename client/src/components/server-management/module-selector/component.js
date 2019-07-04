import React from 'react';
import { Input } from 'reactstrap';

class Component extends React.Component{
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    if(typeof this.props.onChange === 'function')
      this.props.onChange(event.target.value);
  }

  render(){
    return (
      <Input
        type="select"
        className={this.props.className}
        value={this.props.selectedModule || undefined}
        onChange={this.onChange}
        disabled={this.props.disabled}
      >
        <option className="text-default" value={null}>Select a Module...</option>
        {
          this.props.modules.map((module, key) => (
            <option
              className="text-default"
              value={module}
              key={key}
            >
              {module}
            </option>
          ))
        }
      </Input>
    );
  }
}

export default Component;