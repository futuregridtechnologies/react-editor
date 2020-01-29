import { storeState } from './initialState'

const reducers = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR': {
            const newState = {
                ...state,
                isSidebarVisible: !state.isSidebarVisible,
            }

            return storeState(newState)
        }
        case 'SET_DRAFT': {
            const tabs = state.tabs
            tabs[state.currentTab] = {
                ...tabs[state.currentTab],
                draft: action.payload.content,
            }
            const newState = {
                ...state,
                tabs: tabs,
            }
            return storeState(newState)
        }
        case 'REMOVE_DRAFT': {
            const tabs = state.tabs
            tabs[state.currentTab] = {
                ...tabs[state.currentTab],
                draft: '',
            }
            const newState = {
                ...state,
                tabs: tabs,
            }
            return storeState(newState)
        }
        case 'SET_VERSION': {
            const tabs = state.tabs
            tabs[state.currentTab] = {
                ...tabs[state.currentTab],
                version: action.payload.version,
            }
            const newState = {
                ...state,
                tabs: tabs,
            }
            return storeState(newState)
        }
        case 'REMOVE_VERSION': {
            const tabs = state.tabs
            tabs[state.currentTab] = {
                ...tabs[state.currentTab],
                version: null,
            }
            const newState = {
                ...state,
                tabs: tabs,
            }
            return storeState(newState)
        }
        case 'UPDATE_LAST_SAVED': {
            const tabs = state.tabs
            tabs[state.currentTab] = {
                ...tabs[state.currentTab],
                lastSaved: Date.now(),
            }
            const newState = {
                ...state,
                tabs: tabs,
            }
            return storeState(newState)
        }
        case 'ADD_TAB': {
            if (!state.tabs.some(tab => tab.path === action.payload.path)) {
                const newState = {
                    ...state,
                    tabs: [
                        ...state.tabs,
                        {
                            name: action.payload.name,
                            path: action.payload.path,
                            draft: '',
                            version: null,
                            lastSaved: '',
                        },
                    ],
                    currentTab:
                        state.tabs.length === 0 ? 0 : state.currentTab + 1,
                }
                return storeState(newState)
            }
            const newState = {
                ...state,
                currentTab: state.tabs.findIndex(
                    tab => tab.name === action.payload.name
                ),
            }
            return storeState(newState)
        }
        case 'REMOVE_TAB': {
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
            return storeState(newState)
        }
        case 'SET_TAB_INDEX': {
            const newState = {
                ...state,
                currentTab: action.payload,
                isHistoryVisible: false,
            }
            return storeState(newState)
        }
        case 'LEFT_TAB': {
            const newState = {
                ...state,
                currentTab:
                    state.currentTab === 0
                        ? state.currentTab
                        : state.currentTab - 1,
                isHistoryVisible: false,
            }
            return storeState(newState)
        }
        case 'RIGHT_TAB': {
            const newState = {
                ...state,
                currentTab:
                    state.tabs.length - 1 === state.currentTab
                        ? state.currentTab
                        : state.currentTab + 1,
                isHistoryVisible: false,
            }
            return storeState(newState)
        }
        case 'TOGGLE_TAB_DROPDOWN': {
            const newState = {
                ...state,
                isTabDropDownVisible: action.payload,
            }
            return storeState(newState)
        }
        case 'CLOSE_ALL_TABS': {
            const newState = {
                ...state,
                tabs: [],
                currentTab: 0,
                isTabDropDownVisible: false,
                isHistoryVisible: false,
            }
            return storeState(newState)
        }
        case 'TOGGLE_HISTORY_PANEL': {
            const newState = {
                ...state,
                isHistoryVisible: !state.isHistoryVisible,
            }
            return storeState(newState)
        }
        default:
            return state
    }
}

export default reducers
