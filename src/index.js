import React from 'react'
import ReactDOM from 'react-dom'

// Apollo Client Imports
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'

// Schema
import typeDefs from './queries/typeDefs'
import resolvers from './queries/resolvers'

// Components
import App from './App'

// Styles
import './styles/index.scss'

const cache = new InMemoryCache()

const persist = async () => {
	return await persistCache({
		cache,
		debug: process.env.NODE_ENV === 'development' ? true : false,
		storage: window.localStorage,
	})
}

persist()

const client = new ApolloClient({
	link: ApolloLink.from([
		new HttpLink({
			uri: process.env.REACT_APP_GRAPHQL_URI,
		}),
	]),
	cache,
	typeDefs,
	resolvers,
})

cache.writeData({
	data: {
		tabs: [],
	},
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)
