import React from 'react'

const Context = React.createContext()

const initialState = {
	tabs: [],
	currentTab: 0,
	currentFile: { path: '', type: '' },
	isTabDropDownVisible: false,
}

const reducers = (state, action) => {
	switch (action.type) {
		case 'CURRENT_FILE': {
			return {
				...state,
				currentFile: {
					path: action.payload.path,
					type: action.payload.type,
				},
			}
		}
		case 'CLOSE_CURRENT_FILE': {
			return state
		}
		case 'ADD_TAB': {
			if (!state.tabs.some(tab => tab.name === action.payload.name)) {
				return {
					...state,
					tabs: [
						...state.tabs,
						{
							name: action.payload.name,
							content: action.payload.content,
						},
					],
					currentTab:
						state.tabs.length === 0 ? 0 : state.currentTab + 1,
				}
			}
			return {
				...state,
				currentTab: state.tabs.findIndex(
					tab => tab.name === action.payload.name
				),
			}
		}
		case 'removeTab':
			return {
				...state,
				tabs: [
					...state.tabs.filter(
						(_, tabIndex) => tabIndex !== action.payload
					),
				],
				currentTab: state.currentTab === 0 ? 0 : state.currentTab - 1,
			}
		case 'setTabIndex':
			return {
				...state,
				currentTab: action.payload,
			}
		case 'leftTab':
			return {
				...state,
				currentTab:
					state.currentTab === 0
						? state.currentTab
						: state.currentTab - 1,
			}
		case 'rightTab':
			return {
				...state,
				currentTab:
					state.tabs.length - 1 === state.currentTab
						? state.currentTab
						: state.currentTab + 1,
			}
		case 'toggleTabDropdown':
			return {
				...state,
				isTabDropDownVisible: action.payload,
			}
		case 'closeAllTabs':
			return {
				...state,
				tabs: [],
				currentTab: 0,
				isTabDropDownVisible: false,
			}
		default:
			return state
	}
}

export { Context, initialState, reducers }
