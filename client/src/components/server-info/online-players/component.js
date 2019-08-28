import React from 'react';
import { Link } from 'react-router-dom';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";

import AdvancedModal from '../../misc/modals/advanced-modal';

class Component extends React.Component {
  render() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Online Players</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {
            this.props.onlinePlayers.length === 0 && (
              <>
                <div className="text-center mt-2 mb-2">
                  No Players Online!
                </div>
                <div className="btn-wrapper text-center">
                  <i className="far fa-frown-open fa-4x"/>
                </div>
              </>
            )
          }
          {
            this.props.onlinePlayers.map((player, key) => {
              // hide popup in player portal
              if(this.props.playerPortal) return (
                <Badge
                  color="primary"
                  className="mr-2"
                >
                  {player.lastPlayerName}
                </Badge>
              );

              return (
                <AdvancedModal
                  isOpen={false}
                  key={key}
                >
                  {(modal) =>  (
                    <>
                      <Badge
                        color="primary"
                        className="mr-2"
                        onClick={modal.open}
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        {player.lastPlayerName}
                      </Badge>

                      <Modal
                        className="modal-dialog-centered modal-primary"
                        contentClassName="bg-gradient-primary"
                        isOpen={modal.isOpen}
                        toggle={modal.close}
                      >
                        <div className="modal-header">
                          <h6 className="modal-title">
                            Player Info
                          </h6>
                          <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={modal.close}
                          >
                            <span aria-hidden={true}>×</span>
                          </button>
                        </div>
                        <ModalBody>
                          <div className="py-3 text-center">
                            <i className="fas fa-info-circle fa-4x" />
                            <h4 className="heading mt-4">
                              {player.guid}
                            </h4>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="default"
                            className="btn-white"
                            tag={Link}
                            to={`/admin/${this.props.serverID}/players/${player.guid}/`}
                          >
                            View Player Page
                          </Button>
                          <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            onClick={modal.close}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </>
                  )}
                </AdvancedModal>
              );
            })
          }
        </CardBody>
      </Card>
    );
  }
}

export default Component;