import React from 'react';
import classNames from 'classnames';

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
import PlayerSelector from '../../player-selector';

class Component extends React.Component{
  state = {
    reason: '',
    amount: '0',
    type: 'add',
    recipient: null,
    pouch: false
  };
  
  constructor(){
    super();

    this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid(){
    return this.state.amount !== '' &&
      this.state.reason !== '' &&
      (this.state.type !== 'transfer' || this.state.recipient);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.action({
      ...this.state,
      amount: parseInt(this.state.amount)
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
              size="sm"
              onClick={modal.open}
            >
              Adjust Gold
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
                      <Row className="my-2">
                        <Col className="custom-control custom-control-alternative custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="add"
                            checked={this.state.type === 'add'}
                            onChange={() => this.setState({ type: 'add' })}
                          />
                          <label className="custom-control-label" htmlFor="add">
                            Add
                          </label>
                        </Col>
                        <Col className="custom-control custom-control-alternative custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="remove"
                            checked={this.state.type === 'remove'}
                            onChange={() => this.setState({ type: 'remove' })}
                          />
                          <label className="custom-control-label" htmlFor="remove">
                            Remove
                          </label>
                        </Col>
                        <Col className="custom-control custom-control-alternative custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="transfer"
                            checked={this.state.type === 'transfer'}
                            onChange={() => this.setState({ type: 'transfer' })}
                          />
                          <label className="custom-control-label" htmlFor="transfer">
                            Transfer
                          </label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                          >
                            Amount
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="number"
                            value={this.state.amount}
                            onChange={event => this.setState({ amount: event.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="my-4">
                        {
                          (
                            this.state.type === 'add' ||
                            this.state.type === 'remove'
                          ) && (
                            <>
                              <Col className="custom-control custom-control-alternative custom-radio">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  id="bank"
                                  checked={!this.state.pouch}
                                  onChange={event => this.setState({ pouch: !event.target.checked })}
                                />
                                <label className="custom-control-label" htmlFor="bank">
                                  Bank
                                </label>
                              </Col>
                              <Col className="custom-control custom-control-alternative custom-radio">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  id="pouch"
                                  checked={this.state.pouch}
                                  onChange={event => this.setState({ pouch: event.target.checked })}
                                />
                                <label className="custom-control-label" htmlFor="pouch">
                                  Pouch
                                </label>
                              </Col>
                            </>
                          )
                        }
                        {
                          this.state.type === 'transfer' && (
                            <Col>
                              <label
                                className="form-control-label"
                              >
                                Recipient
                              </label>
                              <PlayerSelector
                                serverID={this.props.serverID}
                                player={this.state.recipient}
                                onChange={player => this.setState({ recipient: player })}
                              />
                            </Col>
                          )
                        }
                      </Row>
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
                        className={classNames('mt-2', { disabled: !this.isValid() })}
                        color="primary"
                      >
                        Adjust Gold
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