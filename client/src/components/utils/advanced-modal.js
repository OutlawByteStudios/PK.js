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
  }

  close(){
    this.setState({ isOpen: false });
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