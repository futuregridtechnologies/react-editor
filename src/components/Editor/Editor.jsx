import React, { useRef } from 'react'
import MonacoEditor, { monaco } from '@monaco-editor/react'
import { useLazyQuery } from '@apollo/react-hooks'

import AddReferenceFile from './AddReferenceFile'
import EditorOptions from './EditorOptions'
import History from './History'

import { GET_FILE } from '../../queries/getFile'
import { Context } from '../../state/context'

const Editor = ({ content, commits, path }) => {
	const monacoRef = useRef()
	const editorRef = useRef()

	const { state } = React.useContext(Context)

	const [code, setCode] = React.useState(
		JSON.stringify(JSON.parse(content), null, 4)
	)
	const [isEditorReady, setEditorState] = React.useState(false)
	const [isModalVisible, toggleModal] = React.useState(false)
	const [objectIndex, setObjectIndex] = React.useState(null)
	const [fileType, setFileType] = React.useState('')

	const [getFile, { data: queryFileData }] = useLazyQuery(GET_FILE)

	React.useEffect(() => {
		monaco.init().then(monaco => {
			monacoRef.current = monaco
		})
	}, [])

	React.useEffect(() => {
		const current = JSON.parse(code)
		if (queryFileData && Object.keys(queryFileData).length > 0) {
			switch (fileType) {
				case 'ingredients':
					current.ingredients[
						objectIndex
					].name = `@${queryFileData.getFile.name}`
					break
				default:
					break
			}
			setCode(JSON.stringify(current, null, 2))
		}
	}, [queryFileData])

	const selectFile = async (type, path) => {
		toggleModal(false)
		setFileType(type)
		await getFile({ variables: { path } })
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

	const options = {
		fontFamily: 'monospace',
		fontSize: '16px',
		wordWrap: true,
		quickSuggestions: true,
	}

	return (
		<div
			className={
				state.isHistoryVisible
					? 'editor__wrapper withHistory'
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
			<EditorOptions />
			<MonacoEditor
				height="100vh"
				width="calc(100% - 1px)"
				language="json"
				theme="light"
				value={code}
				options={options}
				editorDidMount={handleEditorDidMount}
			/>
			{state.isHistoryVisible && (
				<History commits={commits} path={path} />
			)}
		</div>
	)
}

export default Editor
