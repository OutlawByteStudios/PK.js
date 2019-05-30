import React from 'react';
import { Input } from 'reactstrap';

class Component extends React.Component{
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    this.props.onChange(event.target.value);
  }

  render(){
    return (
      <Input
        type="select"
        className={this.props.className}
        value={this.props.selectedConfig || undefined}
        onChange={this.onChange}
      >
        <option className="text-default" value={null}>Select a Config...</option>
        {
          this.props.configs.map((config, key) => (
            <option
              className="text-default"
              value={config.name}
              key={key}
            >
              {config.name}
            </option>
          ))
        }
      </Input>
    );
  }
}

export default Component;