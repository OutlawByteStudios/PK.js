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
    publicReason: '',
    privateReason: '',
    length: 1,
    perm: false,
    ipBan: false
  };
  
  constructor(){
    super();

    this.isValid = this.isValid.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid(){
    return this.state.publicReason !== '' &&
      this.state.privateReason !== '';
  }

  onSubmit(event) {
    event.preventDefault();

    if(this.state.ban === '') return;

    this.props.action({
      publicReason: this.state.publicReason,
      privateReason: this.state.privateReason,
      length: (this.state.perm) ? -1 : parseInt(this.state.length),
      ipBan: this.state.ipBan
    });
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
              Add Ban
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
                            Public Reason
                          </label>
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              type="text"
                              value={this.state.publicReason}
                              onChange={event => this.setState({ publicReason: event.target.value, privateReason: event.target.value })}
                              invalid={this.state.publicReason === ''}
                            />
                            <FormFeedback>
                              A ban reason cannot be blank.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                          >
                            Private Reason
                          </label>
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              type="text"
                              value={this.state.privateReason}
                              onChange={event => this.setState({ privateReason: event.target.value })}
                              invalid={this.state.privateReason === ''}
                            />
                            <FormFeedback>
                              A ban reason cannot be blank.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                          >
                            Length (Days)
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="number"
                            value={this.state.length}
                            onChange={event => this.setState({ length: event.target.value })}
                            disabled={this.state.perm}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="custom-control custom-checkbox my-4">
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              checked={this.state.perm}
                              onChange={event => this.setState({ perm: event.target.checked })}
                              id="perm-ban"
                            />
                            <label className="custom-control-label" htmlFor="perm-ban">
                              Permanent Ban
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="custom-control custom-checkbox my-4">
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              checked={this.state.ipBan}
                              onChange={event => this.setState({ ipBan: event.target.checked })}
                              id="ip-ban"
                            />
                            <label className="custom-control-label" htmlFor="ip-ban">
                              IP Ban
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Button
                        className={classNames('mt-2', { disabled: !this.isValid()})}
                        color="primary"
                      >
                        Add Ban
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