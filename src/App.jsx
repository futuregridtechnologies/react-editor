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
    const [isSidebarCollapsed, setSidebarState] = React.useState(false)
    return (
        <Context.Provider value={{ state, dispatch }}>
            <Wrapper
                id="wrapper"
                className={`${isSidebarCollapsed ? 'sidebar__collapsed' : ''}`}
            >
                <Sidebar
                    isSidebarCollapsed={isSidebarCollapsed}
                    setSidebarState={setSidebarState}
                />
                <Main />
            </Wrapper>
        </Context.Provider>
    )
}

export default App
