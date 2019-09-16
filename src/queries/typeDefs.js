import gql from 'graphql-tag'

const typeDefs = gql`
	extend type Tab {
		name: String
		content: String
	}
	extend type Query {
		tabs: [Tab]
	}
	extend type Mutation {
		addTab(file: Tab): Tab
		removeALlTabs: String
		removeTab(index: Int): String
	}
`

export default typeDefs
