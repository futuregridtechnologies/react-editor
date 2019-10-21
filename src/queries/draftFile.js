import gql from 'graphql-tag'

const DRAFT_FILE = gql`
	mutation draftFile($path: String!, $data: String!) {
		draftFile(path: $path, data: $data) {
			... on Error {
				success
				error
			}
			... on Success {
				success
				message
			}
		}
	}
`

export default DRAFT_FILE
