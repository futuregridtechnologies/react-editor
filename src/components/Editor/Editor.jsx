import React, { useRef } from 'react'
import MonacoEditor, { monaco } from '@monaco-editor/react'

import AddReferenceFile from './AddReferenceFile'
import EditorOptions from './EditorOptions'
import Templates from './Templates'

const Editor = ({ content }) => {
	const monacoRef = useRef()
	const editorRef = useRef()
	const [code, setCode] = React.useState(content || '')
	const [isEditorReady, setEditorState] = React.useState(false)
	const [isModalVisible, toggleModal] = React.useState(false)
	const [isTemplateVisible, toggleTemplates] = React.useState(false)

	React.useEffect(() => {
		monaco.init().then(monaco => {
			monacoRef.current = monaco
		})
	}, [])

	const referenceFile = () => {
		toggleModal(!isModalVisible)
		const model = editorRef.current.getModel()
		const position = editorRef.current.getPosition()
		const textUntillPosition = model.getValueInRange({
			startLineNumber: 1,
			startColumn: 1,
			endLineNumber: position.lineNumber,
			endColumn: position.column,
		})
		console.log(textUntillPosition)
	}

	function handleEditorDidMount(_, editor) {
		setEditorState(!isEditorReady)
		editorRef.current = editor
		listenEditorChanges()

		editorRef.current.addCommand(
			monacoRef.current.KeyMod.Shift | monacoRef.current.KeyCode.KEY_2,
			() => referenceFile()
		)
	}

	function listenEditorChanges() {
		editorRef.current.onDidChangeModelContent(ev => {
			// console.log(editorRef.current.getValue());
		})
	}

	const appendCode = (templateType, templateCode) => {
		const current = JSON.parse(code)
		switch (templateType) {
			case 'ingredient':
				if (current.ingredients)
					current.ingredients.push(JSON.parse(templateCode))
				break
			default:
				break
		}
		setCode(JSON.stringify(current, null, 2))
	}

	const options = {
		fontFamily: 'monospace',
		fontSize: '16px',
		wordWrap: true,
		quickSuggestions: true,
	}

	return (
		<div
			className={
				isTemplateVisible
					? 'editor__wrapper withTemplates'
					: 'editor__wrapper'
			}
		>
			{isModalVisible && (
				<AddReferenceFile title="Add File" toggleModal={toggleModal} />
			)}
			<EditorOptions
				isTemplateVisible={isTemplateVisible}
				toggleTemplates={toggleTemplates}
			/>
			<MonacoEditor
				height="100vh"
				width="calc(100% - 1px)"
				language="json"
				theme="light"
				value={code}
				options={options}
				editorDidMount={handleEditorDidMount}
			/>
			{isTemplateVisible && <Templates appendCode={appendCode} />}
		</div>
	)
}

export default Editor
