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

export default GET_FILE
