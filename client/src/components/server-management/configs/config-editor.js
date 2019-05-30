import React from 'react';

import { Input } from 'reactstrap';

class ConfigEditor extends React.Component {
  render(){
    if (this.props.loading) return <p>Loading...</p>;
    if (this.props.errors) return <p>Error :(</p>;

    console.log(this.props.configFile);
    return (
      <Input
        className="form-control-alternative"
        placeholder="A few words about you ..."
        rows="20"
        defaultValue={this.props.configFile.config}
        type="textarea"
      />
    );
  }
}

export default ConfigEditor;