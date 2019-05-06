import React from 'react';

import {
  Alert
} from 'reactstrap';

class FlashAlert extends React.Component{
  state = {
    visible: true
  };

  componentDidMount(){
    setTimeout(() => {
      this.setState({ visible: false });
    }, this.props.delay || 5000);
  }

  render(){
    return (
      <Alert {...this.props} isOpen={this.state.visible}>
        {this.props.children}
      </Alert>
    );
  }
}

export default FlashAlert;