import React from 'react'

import Modal from '../Modal'

const AddReferenceFile = ({ title, toggleModal }) => {
	const onModalClose = () => toggleModal(false)
	const onModalSubmit = () => toggleModal(false)
	return (
		<Modal>
			<Modal.Header>{title}</Modal.Header>
			<Modal.Body>Body</Modal.Body>
			<Modal.Footer>
				<button onClick={() => onModalSubmit()}>Ok</button>
				<button onClick={() => onModalClose()}>Cancel</button>
			</Modal.Footer>
		</Modal>
	)
}

export default AddReferenceFile
