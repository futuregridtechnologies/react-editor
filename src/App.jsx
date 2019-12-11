import React from 'react'

// State
import { Context, initialState, reducers } from './state'

// Sections
import Sidebar from './sections/Sidebar'
import Main from './sections/Main'

const App = () => {
    const [state, dispatch] = React.useReducer(reducers, initialState)
    const [isSidebarCollapsed, setSidebarState] = React.useState(false)
    return (
        <Context.Provider value={{ state, dispatch }}>
            <div
                id="wrapper"
                className={`${isSidebarCollapsed ? 'sidebar__collapsed' : ''}`}
            >
                <Sidebar
                    isSidebarCollapsed={isSidebarCollapsed}
                    setSidebarState={setSidebarState}
                />
                <Main />
            </div>
        </Context.Provider>
    )
}

export default App
