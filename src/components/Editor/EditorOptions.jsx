import React from 'react'
import PropTypes from 'prop-types'

import { TemplateIcon } from '../../assets/Icons'

const EditorOptions = ({ isTemplateVisible, toggleTemplates }) => (
	<div className="editor__options">
		<button
			className="btn__icon"
			title="Templates"
			style={{
				background: isTemplateVisible
					? 'rgba(#000, 0.1)'
					: 'transparent',
			}}
			onClick={() => toggleTemplates(!isTemplateVisible)}
		>
			{TemplateIcon}
		</button>
	</div>
)

EditorOptions.propTypes = {
	isTemplateVisible: PropTypes.bool,
	toggleTemplates: PropTypes.func,
}

export default EditorOptions
