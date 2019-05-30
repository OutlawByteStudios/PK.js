import React from 'react';

import { Input } from 'reactstrap';

class Component extends React.Component {
  constructor(props){
    super();
    this.state = {
      config: props.config
    } ;
  }


  render(){
    return (
      <Input
        type="textarea"
        className="form-control-alternative"
        rows="20"
        value={this.state.config}
        onChange={event => this.setState({ config: event.target.value })}
      />
    );
  }
}

export default Component;