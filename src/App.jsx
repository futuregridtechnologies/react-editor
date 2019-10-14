import React from 'react'

import { Context, initialState, reducers } from './state/context'

import Header from './sections/Header'
import Navbar from './sections/Navbar'
import Main from './sections/Main'
import Sidebar from './sections/Sidebar'

const App = () => {
	const [state, dispatch] = React.useReducer(reducers, initialState)
	const [isNavbarCollapsed, setNavbarState] = React.useState(false)
	return (
		<Context.Provider value={{ state, dispatch }}>
			<div
				id="wrapper"
				className={`${isNavbarCollapsed ? 'navbar__collapsed' : ''}`}
			>
				<Header title="File Editor" />
				<Navbar
					isNavbarCollapsed={isNavbarCollapsed}
					setNavbarState={setNavbarState}
				/>
				<Main />
				<Sidebar />
			</div>
		</Context.Provider>
	)
}

export default App
