import gql from 'graphql-tag'

const OPEN_FILE_SUB = gql`
	subscription {
		openFileSub {
			name
			path
			content
			size
			createdAt
			commits
			lastSaved
		}
	}
`

export default OPEN_FILE_SUB
