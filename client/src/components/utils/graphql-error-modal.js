import React from 'react';
import AdvancedModal from "./advanced-modal";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function(props) {
  if(!props.error) return null;
  return (
    <AdvancedModal>
      {(modal) =>  (
        <Modal
          className="modal-dialog-centered modal-danger"
          contentClassName="bg-gradient-danger"
          isOpen={modal.isOpen}
          toggle={modal.close}
        >
          <ModalHeader>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={modal.close}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </ModalHeader>
          <ModalBody>
            <div className="py-3 text-center">
              <i className="fas fa-exclamation-triangle fa-4x" />
              <h4 className="heading mt-4">Error!</h4>
              {
                props.error.graphQLErrors.map((error, key) => (
                  <p key={key}>{ error.message }</p>
                ))
              }
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="text-white ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={modal.close}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </AdvancedModal>
  );
}