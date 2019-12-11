import React from 'react'
import ReactDOM from 'react-dom'

// Apollo Client Imports
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// Components
import App from './App'

// Styles
import { GlobalStyle } from './styles'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
})

const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_SUB_URI,
    options: {
        reconnect: true,
        lazy: true,
    },
})

const client = new ApolloClient({
    link: split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query)
            return (
                kind === 'OperationDefinition' && operation === 'subscription'
            )
        },
        wsLink,
        httpLink
    ),
    cache,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <GlobalStyle />
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
