import React from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

import AdvancedModal from './advanced-modal';

export default function(props) {
  return (
    <AdvancedModal
      onOpen={props.onOpen}
      onClose={props.onClose}
    >
      {(modal) =>  (
        <Modal
          className="modal-dialog-centered modal-warning"
          contentClassName="bg-gradient-warning"
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
              <h4 className="heading mt-4">Are you sure about that?</h4>
              <p>{props.subText}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn-white"
              color="default"
              type="button"
              onClick={() =>{
                modal.close();
                if(props.action) props.action();
              }}
            >
              I'm sure!
            </Button>
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