import React from 'react';
import classNames from 'classnames';

import {
  Button,
  Card,
  CardBody,
  Form, 
  FormFeedback,
  FormGroup,
  Input,
  Modal,
  ModalBody
} from 'reactstrap';

import AdvancedModal from '../../../misc/modals/advanced-modal';

class Component extends React.Component{
  state = {
    note: ''
  };
  
  constructor(){
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    if(this.state.note === '') return;

    this.props.action(this.state);
  }

  render(){
    return (
      <AdvancedModal
        isOpen={false}
      >
        {(modal) =>  (
          <>
            <Button
              color="primary"
              onClick={modal.open}
            >
              Add Note
            </Button>

            <Modal
              className="modal-dialog-centered"
              isOpen={modal.isOpen}
              toggle={modal.close}
            >
              <ModalBody className="p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="mx-4 my-2 text-center">
                    <Form
                      onSubmit={this.onSubmit}
                    >
                      <label
                        className="form-control-label"
                      >
                        Note
                      </label>
                      <FormGroup>
                        <Input
                          className="form-control-alternative"
                          type="text"
                          value={this.state.note}
                          onChange={event => this.setState({ note: event.target.value })}
                          invalid={this.state.note === ''}
                        />
                        <FormFeedback>
                          A note cannot be blank.
                        </FormFeedback>
                      </FormGroup>
                      <Button
                        className={classNames('mt-2', { disabled: this.state.note === ''})}
                        color="primary"
                      >
                        Add Note
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </ModalBody>
            </Modal>
          </>
        )}
      </AdvancedModal>
    );
  }
}

export default Component;