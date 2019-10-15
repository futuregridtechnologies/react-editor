import React from 'react'
import PropTypes from 'prop-types'

import { HistoryIcon } from '../../assets/Icons'
import { Context } from '../../state/context'

import Modal from '../Modal'

const EditorOptions = ({ publish }) => {
	const { state, dispatch } = React.useContext(Context)
	const [isModalVisible, setIsModalVisible] = React.useState(false)
	const [message, setMessage] = React.useState('')
	return (
		<div className="editor__options">
			{isModalVisible && (
				<Modal>
					<Modal.Header>
						<span>Publish</span>
						<button
							onClick={() =>
								setIsModalVisible(!isModalVisible) ||
								setMessage('')
							}
						>
							x
						</button>
					</Modal.Header>
					<Modal.Body>
						<label htmlFor="">Message</label>
						<input
							type="text"
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>
					</Modal.Body>
					<Modal.Footer>
						<button
							onClick={() =>
								publish(message) ||
								setMessage('') ||
								setIsModalVisible(!isModalVisible)
							}
						>
							Confirm
						</button>
						<button
							onClick={() =>
								setIsModalVisible(!isModalVisible) ||
								setMessage('')
							}
						>
							Cancel
						</button>
					</Modal.Footer>
				</Modal>
			)}
			<div id="left">
				<button
					className="btn__icon"
					title="History"
					style={{
						background: state.isHistoryVisible
							? 'rgba(#000, 0.1)'
							: 'transparent',
					}}
					onClick={() => dispatch({ type: 'TOGGLE_HISTORY_PANEL' })}
				>
					<HistoryIcon color="var(--icon-grey)" />
				</button>
			</div>
			<div id="right" onClick={() => setIsModalVisible(!isModalVisible)}>
				<button>Publish</button>
			</div>
		</div>
	)
}

EditorOptions.propTypes = {
	publish: PropTypes.func,
}

export default EditorOptions
