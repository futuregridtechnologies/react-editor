import React from 'react'

import { Context, initialState, reducers } from './state/context'

import Navbar from './sections/Navbar'
import Main from './sections/Main'

const App = () => {
	const [state, dispatch] = React.useReducer(reducers, initialState)
	const [isNavbarCollapsed, setNavbarState] = React.useState(false)
	return (
		<Context.Provider value={{ state, dispatch }}>
			<div
				id="wrapper"
				className={`${isNavbarCollapsed ? 'navbar__collapsed' : ''}`}
			>
				<Navbar
					isNavbarCollapsed={isNavbarCollapsed}
					setNavbarState={setNavbarState}
				/>
				<Main />
			</div>
		</Context.Provider>
	)
}

export default App
