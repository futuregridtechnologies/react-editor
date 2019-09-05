import React, { useRef } from 'react'
import MonacoEditor, { monaco } from '@monaco-editor/react'

import Modal from './Modal'

import { TemplateIcon } from '../assets/Icons'

const AddRefrenceFile = ({ title, toggleModal }) => {
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

const Templates = () => {
	const [search, setSearch] = React.useState('')
	const [templates] = React.useState([
		{ name: 'Ingredient' },
		{ name: 'Packaging' },
	])
	return (
		<div className="templates">
			<header>
				<h3>Templates</h3>
				<input
					type="text"
					className="templates__search"
					placeholder="Search templates..."
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</header>
			<main>
				{templates
					.filter(item =>
						item.name.toLowerCase().includes(search.toLowerCase())
					)
					.map((template, index) => (
						<div className="templates__item" key={index}>
							<span>{template.name}</span>
							<button>Add</button>
						</div>
					))}
			</main>
		</div>
	)
}

const Editor = ({ content }) => {
	const monacoRef = useRef()
	const editorRef = useRef()
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
				<AddRefrenceFile title="Add File" toggleModal={toggleModal} />
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
				value={content}
				options={options}
				editorDidMount={handleEditorDidMount}
			/>
			{isTemplateVisible && <Templates />}
		</div>
	)
}

export default Editor
