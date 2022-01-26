import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalContainer = ({ handleClose, show }) => {
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Oops!</Modal.Title>
				</Modal.Header>
				<Modal.Body>We couldn't find that city. Please try again.</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalContainer;
