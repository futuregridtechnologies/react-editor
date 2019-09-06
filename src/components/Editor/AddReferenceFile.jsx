import React from 'react'

import Modal from '../Modal'

const FileSection = ({ files, selectFile }) => (
	<section>
		<h2>Menu</h2>
		{files.map((file, index) => (
			<div key={index}>
				<span>{file.split('/').pop()}</span>
				<button onClick={() => selectFile(file)}>Add</button>
			</div>
		))}
	</section>
)

const AddReferenceFile = ({ title, toggleModal }) => {
	const [search, setSearch] = React.useState('')
	const [searchResult, setSearchResult] = React.useState({})

	const selectFile = file => console.log({ file }) || toggleModal(false)

	const hitSearch = () => {
		const query = `
			query searchFiles($path: String!) {
				searchFiles(path: $path) {
					menus
					recipes
					packages
					dishes
					ingredients
				}
			}`
		const url = process.env.REACT_APP_GRAPHQL_URI
		const opts = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query, variables: { path: search } }),
		}
		fetch(url, opts)
			.then(res => res.json())
			.then(({ data }) => {
				setSearchResult(data.searchFiles)
			})
			.catch(console.error)
	}

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
					<button onClick={() => hitSearch()}>Search</button>
				</header>

				{searchResult.menus && searchResult.menus.length > 0 && (
					<FileSection
						files={searchResult.menus}
						selectFile={selectFile}
					/>
				)}
				{searchResult.ingredients &&
					searchResult.ingredients.length > 0 && (
						<FileSection
							files={searchResult.ingredients}
							selectFile={selectFile}
						/>
					)}
				{searchResult.dishes && searchResult.dishes.length > 0 && (
					<FileSection
						files={searchResult.dishes}
						selectFile={selectFile}
					/>
				)}
				{searchResult.packages && searchResult.packages.length > 0 && (
					<FileSection
						files={searchResult.packages}
						selectFile={selectFile}
					/>
				)}
				{searchResult.recipes && searchResult.recipes.length > 0 && (
					<FileSection
						files={searchResult.recipes}
						selectFile={selectFile}
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
