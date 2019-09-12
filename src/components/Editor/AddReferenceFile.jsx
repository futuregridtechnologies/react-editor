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
				<button onClick={() => selectFile(title.toLowerCase(), file)}>
					Add
				</button>
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
			setSearchResult(queryFilesData.searchFiles)
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
								variables: { path: search },
							})
						}
					>
						Search
					</button>
				</header>

				{searchResult.menus && searchResult.menus.length > 0 && (
					<FileSection
						files={searchResult.menus}
						selectFile={selectFile}
						title="Menus"
					/>
				)}
				{searchResult.ingredients &&
					searchResult.ingredients.length > 0 && (
						<FileSection
							files={searchResult.ingredients}
							selectFile={selectFile}
							title="Ingredients"
						/>
					)}
				{searchResult.dishes && searchResult.dishes.length > 0 && (
					<FileSection
						files={searchResult.dishes}
						selectFile={selectFile}
						title="Dishes"
					/>
				)}
				{searchResult.packages && searchResult.packages.length > 0 && (
					<FileSection
						files={searchResult.packages}
						selectFile={selectFile}
						title="Packages"
					/>
				)}
				{searchResult.recipes && searchResult.recipes.length > 0 && (
					<FileSection
						files={searchResult.recipes}
						selectFile={selectFile}
						title="Recipes"
					/>
				)}
			</Modal.Body>
			<Modal.Footer>
				<button onClick={() => onModalClose()}>Cancel</button>
			</Modal.Footer>
		</Modal>
	)
}

export default AddReferenceFile
