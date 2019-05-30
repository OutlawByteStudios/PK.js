import React from 'react';

import { Input } from 'reactstrap';

class ConfigSelector extends React.Component {
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    this.props.action(event.target.value);
  }

  render(){
    if (this.props.loading) return <p>Loading...</p>;
    if (this.props.errors) return <p>Error :(</p>;

    return (
      <Input
        type="select"
        className={this.props.className}
        value={this.props.selectedConfig || 'Select a Config...'}
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

export default ConfigSelector;