import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import Modal from '../Modal'

import SEARCH_FILES from '../../queries/searchFiles'

const FileSection = ({ title, files, selectFile }) => (
	<section>
		<h2>{title}</h2>
		{files.map((file, index) => (
			<div key={index}>
				<span>{file.split('/').pop()}</span>
				<button onClick={() => selectFile(file)}>Add</button>
			</div>
		))}
	</section>
)

const AddReferenceFile = ({ title, toggleModal, selectFile }) => {
	const [search, setSearch] = React.useState('')
	const [searchResult, setSearchResult] = React.useState({})
	const [searchFiles, { data: queryFilesData }] = useLazyQuery(SEARCH_FILES)

	React.useEffect(() => {
		if (queryFilesData && Object.keys(queryFilesData).length > 0) {
			setSearchResult(JSON.parse(queryFilesData.searchFiles))
		}
	}, [queryFilesData])

	const onModalClose = () => toggleModal(false)
	return (
		<Modal addClass="add__reference__file">
			<Modal.Header>
				<span>{title}</span>
				<button onClick={() => onModalClose()}>x</button>
			</Modal.Header>
			<Modal.Body>
				<header>
					<input
						type="text"
						placeholder="search files..."
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
					<button
						onClick={() =>
							searchFiles({
								variables: { fileName: search },
							})
						}
					>
						Search
					</button>
				</header>
				{Object.keys(searchResult).map(app => (
					<FileSection
						key={app}
						files={searchResult[app]}
						selectFile={selectFile}
						title={app}
					/>
				))}
			</Modal.Body>
			<Modal.Footer>
				<button onClick={() => onModalClose()}>Cancel</button>
			</Modal.Footer>
		</Modal>
	)
}

export default AddReferenceFile
