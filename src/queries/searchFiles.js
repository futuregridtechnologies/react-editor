import gql from 'graphql-tag'

const SEARCH_FILES = gql`
	query searchFiles($path: String!) {
		searchFiles(path: $path) {
			menus
			recipes
			packages
			dishes
			ingredients
		}
	}
`

export default SEARCH_FILES
