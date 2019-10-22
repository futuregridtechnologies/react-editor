import React from 'react'
import PropTypes from 'prop-types'

import { HistoryIcon } from '../../assets/Icons'
import { Context } from '../../state/context'

import Modal from '../Modal'

const EditorOptions = ({ draft, publish, viewCurrentVersion }) => {
	const { state, dispatch } = React.useContext(Context)
	const [isModalVisible, setIsModalVisible] = React.useState({
		publish: false,
		draft: false,
	})
	const [message, setMessage] = React.useState('')

	return (
		<div className="editor__options">
			{isModalVisible.publish && (
				<Modal>
					<Modal.Header>
						<span>Publish</span>
						<button
							onClick={() =>
								setIsModalVisible({
									publish: !isModalVisible.publish,
								}) || setMessage('')
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
								setIsModalVisible({
									publish: !isModalVisible.publish,
								}) ||
								setMessage('') ||
								publish(message)
							}
						>
							Confirm
						</button>
						<button
							onClick={() =>
								setIsModalVisible({
									publish: !isModalVisible.publish,
								}) || setMessage('')
							}
						>
							Cancel
						</button>
					</Modal.Footer>
				</Modal>
			)}
			{isModalVisible.draft && (
				<Modal>
					<Modal.Header>
						<span>Draft</span>
						<button
							onClick={() =>
								setIsModalVisible({
									draft: !isModalVisible.draft,
								}) || setMessage('')
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
								draft(message) ||
								setMessage('') ||
								setIsModalVisible({
									draft: !isModalVisible.draft,
								})
							}
						>
							Confirm
						</button>
						<button
							onClick={() =>
								setIsModalVisible({
									draft: !isModalVisible.draft,
								}) || setMessage('')
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
			{state.tabs[state.currentTab].version && (
				<div>
					<span>
						Viewing version
						{new Intl.DateTimeFormat('en-US', {
							month: 'short',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
						}).format(state.tabs[state.currentTab].version)}
					</span>
					<button onClick={() => viewCurrentVersion()}>
						View Current
					</button>
				</div>
			)}
			<div id="right">
				<button
					onClick={() =>
						setIsModalVisible({
							draft: !isModalVisible.draft,
						})
					}
				>
					Save
				</button>
				<button
					onClick={() =>
						setIsModalVisible({
							publish: !isModalVisible.publish,
						})
					}
				>
					Publish
				</button>
			</div>
		</div>
	)
}

EditorOptions.propTypes = {
	publish: PropTypes.func,
	viewCurrentVersion: PropTypes.func,
}

export default EditorOptions
