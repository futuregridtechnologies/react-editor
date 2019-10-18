import React, { useRef } from 'react'
import MonacoEditor, { monaco } from '@monaco-editor/react'
import { useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'

import AddReferenceFile from './AddReferenceFile'
import EditorOptions from './EditorOptions'
import History from './History'

import { GET_FILE_FETCH } from '../../queries/getFile'
import UPDATE_FILE from '../../queries/updateFile'

import fetchCall from '../../utils/fetchCall'

import { Context } from '../../state/context'

const Editor = ({ path }) => {
	const monacoRef = useRef()
	const editorRef = useRef()

	const { state, dispatch } = React.useContext(Context)

	const [code, setCode] = React.useState('')
	const [file, setFile] = React.useState({})
	const [isModalVisible, toggleModal] = React.useState(false)
	const [updateFile] = useMutation(UPDATE_FILE)

	React.useEffect(() => {
		monaco.init().then(monaco => {
			monacoRef.current = monaco
		})
	}, [])

	React.useEffect(() => {
		const body = JSON.stringify({
			query: GET_FILE_FETCH,
			variables: {
				path: path,
			},
		})
		fetchCall(body).then(({ data }) => {
			const { getFile } = data
			setCode(JSON.stringify(JSON.parse(getFile.content), null, 2))
			setFile(getFile)
		})
	}, [path])

	const selectFile = async (type, path) => {
		toggleModal(false)
		const position = editorRef.current.getPosition()

		const range = new monacoRef.current.Range(
			position.lineNumber,
			position.column,
			position.lineNumber,
			position.column
		)

		const id = { major: 1, minor: 1 }
		let index = path.lastIndexOf('/') + 1
		const text = path.slice(index)
		const op = {
			identifier: id,
			range: range,
			text: `@${text}`,
			forceMoveMarkers: true,
		}
		editorRef.current.executeEdits(code, [op])
	}

	function handleEditorDidMount(_, editor) {
		editorRef.current = editor

		editorRef.current.addCommand(
			monacoRef.current.KeyMod.Shift | monacoRef.current.KeyCode.KEY_2,
			() => toggleModal(!isModalVisible)
		)
	}

	const publish = message => {
		const code = editorRef.current.getValue()
		updateFile({
			variables: {
				path: path,
				data: code,
				commitMessage: message,
				validatedFor: [],
			},
		})
	}

	const viewCurrentVersion = () => {
		setCode(state.tabs[state.currentTab].draft)
		dispatch({ type: 'REMOVE_VERSION', payload: path })
		dispatch({ type: 'REMOVE_DRAFT', payload: path })
	}

	const selectVersion = contentVersion => {
		if (state.tabs.find(tab => tab.path === path).draft === '') {
			dispatch({
				type: 'SET_DRAFT',
				payload: {
					content: editorRef.current.getValue(),
					path: path,
				},
			})
		}
		setCode(contentVersion)
	}

	const options = {
		fontFamily: 'monospace',
		fontSize: '16px',
		wordWrap: true,
		quickSuggestions: true,
		autoIndent: true,
		contextmenu: false,
		formatOnType: true,
		highlightActiveIndentGuide: true,
		quickSuggestionsDelay: 100,
		renderIndentGuides: true,
		renderLineHighlight: 'all',
		roundedSelection: true,
		scrollBeyondLastColumn: 5,
		scrollBeyondLastLine: false,
		selectOnLineNumbers: true,
		selectionHighlight: true,
		smoothScrolling: true,
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
			<EditorOptions
				publish={publish}
				viewCurrentVersion={viewCurrentVersion}
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
			{state.isHistoryVisible && Object.keys(file).length > 0 && (
				<History
					commits={file.commits}
					path={path}
					selectVersion={selectVersion}
				/>
			)}
		</div>
	)
}

Editor.propTypes = {
	path: PropTypes.string,
}

export default Editor
