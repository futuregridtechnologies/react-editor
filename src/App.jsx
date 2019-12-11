import React from 'react'

// State
import { Context, initialState, reducers } from './state'

// Sections
import Sidebar from './sections/Sidebar'
import Main from './sections/Main'

// Styles
import { Wrapper } from './styles'

const App = () => {
    const [state, dispatch] = React.useReducer(reducers, initialState)
    return (
        <Context.Provider value={{ state, dispatch }}>
            <Wrapper isSidebarVisible={state.isSidebarVisible}>
                <Sidebar />
                <Main />
            </Wrapper>
        </Context.Provider>
    )
}

export default App
