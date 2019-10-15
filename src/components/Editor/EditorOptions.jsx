import React from 'react'
import PropTypes from 'prop-types'

import { HistoryIcon } from '../../assets/Icons'
import { Context } from '../../state/context'

const EditorOptions = () => {
	const { state, dispatch } = React.useContext(Context)
	return (
		<div className="editor__options">
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
	)
}

EditorOptions.propTypes = {
	isTemplateVisible: PropTypes.bool,
	toggleTemplates: PropTypes.func,
}

export default EditorOptions
