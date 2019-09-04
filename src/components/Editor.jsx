import React, { useRef, useState } from 'react'
import MonacoEditor, { monaco } from '@monaco-editor/react'

const Editor = ({ content }) => {
	const editorRef = useRef()
	React.useEffect(() => {
		monaco
			.init()
			.then(monaco => {})
			.catch(error =>
				console.error(
					'An error occurred during initialization of Monaco: ',
					error
				)
			)
	}, [])

	function handleEditorDidMount(_, editor) {
		editorRef.current = editor
		listenEditorChanges()
	}

	function listenEditorChanges() {
		editorRef.current.onDidChangeModelContent(ev => {
			// console.log(editorRef.current.getValue());
		})
	}

	const options = {
		fontFamily: '"Roboto Mono", monospace',
		fontSize: '13px',
		wordWrap: true,
		quickSuggestions: true,
	}
	return (
		<div className="editor__wrapper">
			<MonacoEditor
				height="100vh"
				language="json"
				theme="light"
				value={content}
				options={options}
				editorDidMount={handleEditorDidMount}
			/>
		</div>
	)
}

export default Editor
