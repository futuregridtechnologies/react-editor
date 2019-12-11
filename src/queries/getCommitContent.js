const GET_COMMIT_CONTENT_FETCH = `
	query getCommitContent($path: String!, $id: String!) {
		getCommitContent(path: $path, id: $id)
	}
`

export default GET_COMMIT_CONTENT_FETCH
