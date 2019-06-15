import React from 'react';

import {
  Button,
  Card,
  CardBody,
  Col,
  Form, 
  FormFeedback,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row
} from 'reactstrap';

import AdvancedModal from '../../../misc/modals/advanced-modal';
import classNames from "classnames";

class Component extends React.Component{
  state = {
    reason: '',
  };
  
  constructor(){
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    if(this.state.reason === '') return;

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
              color="danger"
              size="sm"
              onClick={modal.open}
            >
              Delete Ban
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
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                          >
                            Reason
                          </label>
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              type="text"
                              value={this.state.reason}
                              onChange={event => this.setState({ reason: event.target.value })}
                              invalid={this.state.reason === ''}
                            />
                            <FormFeedback>
                              A reason cannot be blank.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className={classNames('mt-2', { disabled: this.state.reason === ''})}
                        color="primary"
                      >
                        Delete Ban
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