import React, { useRef } from 'react'
import MonacoEditor, { monaco } from '@monaco-editor/react'

import AddReferenceFile from './AddReferenceFile'
import EditorOptions from './EditorOptions'
import Templates from './Templates'

const Editor = ({ content }) => {
	const monacoRef = useRef()
	const editorRef = useRef()
	const [code, setCode] = React.useState(
		JSON.stringify(content, null, 2) || ''
	)
	const [isEditorReady, setEditorState] = React.useState(false)
	const [isModalVisible, toggleModal] = React.useState(false)
	const [isTemplateVisible, toggleTemplates] = React.useState(false)
	const [objectIndex, setObjectIndex] = React.useState(null)

	React.useEffect(() => {
		monaco.init().then(monaco => {
			monacoRef.current = monaco
		})
	}, [])

	const selectFile = (type, path) => {
		console.log({ type, path })
		toggleModal(false)
		const query = `
			query getFile($path: String!) {
				getFile(path: $path) {
					size
					name
					createdAt
					content
				}
			}`
		const url = process.env.REACT_APP_GRAPHQL_URI
		const opts = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query, variables: { path } }),
		}
		fetch(url, opts)
			.then(res => res.json())
			.then(({ data }) => {
				const current = JSON.parse(code)
				switch (type) {
					case 'ingredients':
						current.ingredients[
							objectIndex
						].name = `@${data.getFile.name}`
						break
					default:
						break
				}
				setCode(JSON.stringify(current, null, 2))
			})
			.catch(console.error)
	}

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
		let stringifyThatText = JSON.stringify(textUntillPosition)
		let getIndex = Number(
			stringifyThatText.slice(
				stringifyThatText.lastIndexOf('index') + 9
			)[0]
		)
		setObjectIndex(getIndex)
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
		const parseTemplateCode = JSON.parse(templateCode)
		switch (templateType) {
			case 'ingredient':
				if (current.ingredients) {
					parseTemplateCode.index = current.ingredients.length
					current.ingredients.push(parseTemplateCode)
				} else {
					current.ingredients = []
					parseTemplateCode.index = current.ingredients.length
					current.ingredients.push(parseTemplateCode)
				}
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
				<AddReferenceFile
					title="Add File"
					toggleModal={toggleModal}
					selectFile={selectFile}
				/>
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
