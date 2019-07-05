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

import AdvancedModal from '../../misc/modals/advanced-modal';
import classNames from "classnames";
import { validatorServerName } from "shared/validators";

class Component extends React.Component{
  state = {
    name: ''
  };

  constructor(){
    super();

    this.isValid = this.isValid.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid(){
    return validatorServerName(this.state.name);
  }

  onSubmit(event) {
    event.preventDefault();

    if(!this.isValid()) return;

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
              color="warning"
              onClick={modal.open}
            >
              Rename Server
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
                            Server Name
                          </label>
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              type="text"
                              value={this.state.name}
                              onChange={event => this.setState({ name: event.target.value })}
                              invalid={!validatorServerName(this.state.name)}
                            />
                            <FormFeedback>
                              A server name cannot be blank and must only contain the characters A-Z, a-z, 0-9 or _
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className={classNames('mt-2', { disabled: !this.isValid()})}
                        color="primary"
                      >
                        Rename Server
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