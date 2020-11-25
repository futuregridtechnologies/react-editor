import React from 'react'
import ReactDOM from 'react-dom'

// Apollo Client Imports
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
// Components
import App from './App'

// Styles
import { GlobalStyle } from './styles'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
})

const client = new ApolloClient({
    link: httpLink,
    cache,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <GlobalStyle />
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
