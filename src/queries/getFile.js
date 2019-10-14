import gql from 'graphql-tag'

const GET_FILE = gql`
	query getFile($path: String!) {
		getFile(path: $path) {
			size
			name
			createdAt
			content
			commits
		}
	}
`

const GET_FILE_FETCH = `
	query getFile($path: String!) {
		getFile(path: $path) {
			size
			name
			createdAt
			content
			commits
		}
	}
`

export { GET_FILE, GET_FILE_FETCH }
