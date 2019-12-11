const storedState = localStorage.getItem('state')

const initialState = storedState
    ? JSON.parse(storedState)
    : {
          tabs: [],
          currentTab: 0,
          isHistoryVisible: false,
          isTabDropDownVisible: false,
      }

const storeState = state => {
    localStorage.setItem('state', JSON.stringify(state))
    return state
}

export { storedState, initialState, storeState }
