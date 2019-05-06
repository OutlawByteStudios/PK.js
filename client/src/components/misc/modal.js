import React from 'react';

import {
  Modal
} from "reactstrap";

class AdvancedModal extends React.Component {
  state = {
    isOpen: true
  };

  constructor(){
    super();
    this.close = this.close.bind(this);
  }

  close(){
    this.setState({ isOpen: false });
  }

  render(){
    return (
      <Modal isOpen={this.state.isOpen} {...this.props}>
        {this.props.children(this.close)}
      </Modal>
    )
  }
}

export default AdvancedModal;