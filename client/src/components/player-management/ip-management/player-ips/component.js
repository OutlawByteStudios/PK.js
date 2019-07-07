import React from 'react';
import moment from 'moment';

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

import AdvancedModal from '../../../misc/modals/advanced-modal';

class Component extends React.Component {
  render() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Player IPs</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {
            this.props.ips.map((ip, key) => (
              <AdvancedModal
                isOpen={false}
                key={key}
              >
                {(modal) =>  (
                  <>
                    <Badge
                      color="primary"
                      onClick={modal.open}
                      style={{
                        cursor: 'pointer'
                      }}
                    >
                      #{ip.ipMask.id.toString().padStart(6, '0')}
                    </Badge>

                    <Modal
                      className="modal-dialog-centered modal-primary"
                      contentClassName="bg-gradient-primary"
                      isOpen={modal.isOpen}
                      toggle={modal.close}
                    >
                      <div className="modal-header">
                        <h6 className="modal-title">
                          Player IP Info
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
                            #{ip.ipMask.id.toString().padStart(6, '0')}
                          </h4>
                          <p><strong>IP Address:</strong> {(ip.ipMask.ip) ? ip.ipMask.ip : '***.***.***.***'}</p>
                          <p><strong>Last Seen:</strong> {moment(ip.lastSeen).format('DD/MM/YYYY HH:mm')}</p>
                        </div>
                      </ModalBody>
                      <ModalFooter>
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
            ))
          }
        </CardBody>
      </Card>
    );
  }
}

export default Component;