import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'

// State
import { Context } from '../../state'

// Components
import { Editor } from '../../components'

// Styles
import { MainWrapper } from './styles'

// Queries
import { OPEN_FILE } from '../../queries'

// Assets
import {
    CloseIcon,
    CaretLeftIcon,
    CaretRightIcon,
    CaretDownIcon,
    CaretUpIcon,
} from '../../assets/Icons'

const Main = () => {
    const { state, dispatch } = React.useContext(Context)

    const { data } = useSubscription(OPEN_FILE)

    React.useEffect(() => {
        if (data && data.openFileSub) {
            dispatch({
                type: 'ADD_TAB',
                payload: {
                    name: data.openFileSub.path.split('/').pop(),
                    path: data.openFileSub.path,
                },
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    if (state.tabs.length === 0) {
        return (
            <MainWrapper id="main">
                Select a file from the explorer.
            </MainWrapper>
        )
    }
    return (
        <MainWrapper id="main">
            <Tabs
                index={state.currentTab}
                onChange={index =>
                    dispatch({ type: 'SET_TAB_INDEX', payload: index })
                }
            >
                <TabList>
                    {state.tabs.map((tab, index) => (
                        <Tab key={index}>
                            <span title={tab.name}>{`${
                                tab.name.length > 12
                                    ? `${tab.name.slice(0, 10)}...`
                                    : tab.name
                            }`}</span>
                            <span
                                onClick={e => {
                                    e.stopPropagation()
                                    dispatch({
                                        type: 'REMOVE_TAB',
                                        payload: index,
                                    })
                                }}
                            >
                                {CloseIcon}
                            </span>
                        </Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {state.tabs.map((tab, index) => (
                        <TabPanel key={index}>
                            <Editor {...tab} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
            <div id="tabs__navigation">
                <span onClick={() => dispatch({ type: 'LEFT_TAB' })}>
                    {CaretLeftIcon}
                </span>
                <span onClick={() => dispatch({ type: 'RIGHT_TAB' })}>
                    {CaretRightIcon}
                </span>
                <span
                    onClick={() =>
                        dispatch({
                            type: 'TOGGLE_TAB_DROPDOWN',
                            payload: !state.isTabDropDownVisible,
                        })
                    }
                >
                    {state.isTabDropDownVisible ? CaretUpIcon : CaretDownIcon}
                </span>
                {state.isTabDropDownVisible && (
                    <div id="tab__options">
                        <ul>
                            <li
                                onClick={() =>
                                    dispatch({ type: 'CLOSE_ALL_TABS' })
                                }
                            >
                                Close All Tabs
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </MainWrapper>
    )
}

export default Main
