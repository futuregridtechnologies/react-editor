import React from 'react'

const Context = React.createContext()

const storedState = localStorage.getItem('state')

const initialState = localStorage.getItem('state')
	? JSON.parse(storedState)
	: {
			tabs: [],
			currentTab: 0,
			currentFile: { path: '', type: '' },
			isTabDropDownVisible: false,
			isHistoryVisible: false,
	  }

const reducers = (state, action) => {
	switch (action.type) {
		case 'CURRENT_FILE': {
			const newState = {
				...state,
				currentFile: {
					path: action.payload.path,
					type: action.payload.type,
				},
				isHistoryVisible: false,
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		case 'CLOSE_CURRENT_FILE': {
			const newState = {
				...state,
				currentFile: { path: '', type: '' },
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		case 'ADD_TAB': {
			if (!state.tabs.some(tab => tab.name === action.payload.name)) {
				const newState = {
					...state,
					tabs: [
						...state.tabs,
						{
							name: action.payload.name,
							path: action.payload.path,
						},
					],
					currentTab:
						state.tabs.length === 0 ? 0 : state.currentTab + 1,
				}
				localStorage.setItem('state', JSON.stringify(newState))
				return newState
			}
			const newState = {
				...state,
				currentTab: state.tabs.findIndex(
					tab => tab.name === action.payload.name
				),
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		case 'removeTab': {
			const newState = {
				...state,
				tabs: [
					...state.tabs.filter(
						(_, tabIndex) => tabIndex !== action.payload
					),
				],
				currentTab: state.currentTab === 0 ? 0 : state.currentTab - 1,
				isHistoryVisible: false,
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		case 'setTabIndex': {
			const newState = {
				...state,
				currentTab: action.payload,
				isHistoryVisible: false,
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		case 'leftTab': {
			const newState = {
				...state,
				currentTab:
					state.currentTab === 0
						? state.currentTab
						: state.currentTab - 1,
				isHistoryVisible: false,
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		case 'rightTab': {
			const newState = {
				...state,
				currentTab:
					state.tabs.length - 1 === state.currentTab
						? state.currentTab
						: state.currentTab + 1,
				isHistoryVisible: false,
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		case 'toggleTabDropdown': {
			const newState = {
				...state,
				isTabDropDownVisible: action.payload,
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		case 'closeAllTabs': {
			const newState = {
				...state,
				tabs: [],
				currentTab: 0,
				isTabDropDownVisible: false,
				isHistoryVisible: false,
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		case 'TOGGLE_HISTORY_PANEL': {
			const newState = {
				...state,
				isHistoryVisible: !state.isHistoryVisible,
			}
			localStorage.setItem('state', JSON.stringify(newState))
			return newState
		}
		default:
			return state
	}
}

export { Context, initialState, reducers }
