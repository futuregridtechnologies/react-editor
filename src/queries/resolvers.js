import gql from 'graphql-tag'

const resolvers = {
	Mutation: {
		addTab: async (_, args, { cache }) => {
			const query = gql`
				query getTabs {
					tabs @client
				}
			`
			const { tabs } = cache.readQuery({ query })
			if (!tabs.some(tab => tab.name === args.file.name)) {
				const data = {
					tabs: [...tabs, args.file],
				}
				cache.writeQuery({ query, data })
			}
			return args.file
		},
		removeTab: async (_, args, { cache }) => {
			const query = gql`
				query getTabs {
					tabs @client
				}
			`
			const { tabs } = cache.readQuery({ query })
			const data = {
				tabs: [
					...tabs.filter((_, tabIndex) => tabIndex !== args.index),
				],
			}
			cache.writeQuery({ query, data })
			return 'Tab removed'
		},
		removeAllTabs: async (_, args, { cache }) => {
			const query = gql`
				query getTabs {
					tabs @client
				}
			`
			const data = {
				tabs: [],
			}
			cache.writeQuery({ query, data })
			return 'Removed all tabs!'
		},
	},
}

export default resolvers
