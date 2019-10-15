import gql from 'graphql-tag'

const UPDATE_FILE = gql`
	mutation updateFile(
		$path: String!
		$data: String!
		$commitMessage: String!
		$validatedFor: [String]!
	) {
		updateFile(
			path: $path
			data: $data
			commitMessage: $commitMessage
			validatedFor: $validatedFor
		) {
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

export default UPDATE_FILE
