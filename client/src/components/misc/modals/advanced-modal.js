import React from 'react';

class AdvancedModal extends React.Component {
  state = {
    isOpen: true
  };

  constructor(){
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(){
    this.setState({ isOpen: true });
    if(this.props.onOpen) this.props.onOpen();
  }

  close(){
    this.setState({ isOpen: false });
    if(this.props.onClose) this.props.onClose();
  }

  render(){
    return (
      <>
        {
          this.props.children({
            isOpen: this.state.isOpen,
            open: this.open,
            close: this.close
          })
        }
      </>
    );
  }
}

export default AdvancedModal;