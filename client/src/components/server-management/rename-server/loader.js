import React from 'react';

import {
  Card,
  CardBody,
  Modal,
  ModalBody
} from "reactstrap";
import AdvancedModal from "../../misc/modals/advanced-modal";

export default function() {
  return (
    <AdvancedModal
    >
      {(modal) =>  (
        <Modal
          className="modal-dialog-centered"
          isOpen={modal.isOpen}
          toggle={modal.close}
        >
          <ModalBody className="p-0">
            <Card className="bg-secondary shadow border-0">
              <CardBody>
                <div className="text-center mt-2 mb-3">
                  Loading...
                </div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
      )}
    </AdvancedModal>
  );
}