import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import Editor from '../components/Editor/Editor'

// Import Tabs Components
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'

// Import Icons
import {
	CloseIcon,
	CaretLeftIcon,
	CaretRightIcon,
	CaretDownIcon,
	CaretUpIcon,
} from '../assets/Icons'

// Import Queries
import GET_FILE from '../queries/getFile'

// Import Util Functions
import isJson from '../utils/isJson'

// Import State
import { initialState, reducer } from '../state/tabs'

const GET_TABS = gql`
	{
		tabs @client
	}
`

const ADD_TAB = gql`
	mutation addTab($file: String) {
		addTab(file: $file) @client
	}
`

const REMOVE_ALL_TABS = gql`
	mutation removeAllTabs {
		removeAllTabs @client
	}
`
const REMOVE_TAB = gql`
	mutation removeTab($index: Int) {
		removeTab(index: $index) @client
	}
`

const Main = ({ selectedFile }) => {
	const [state, dispatch] = React.useReducer(reducer, initialState)
	const [addTabMutation] = useMutation(ADD_TAB)
	const [removeAllTabsMutation] = useMutation(REMOVE_ALL_TABS)
	const [removeTabMutation] = useMutation(REMOVE_TAB)
	const { data: queryData } = useQuery(GET_FILE, {
		variables: { path: selectedFile.path },
	})
	React.useEffect(() => {
		if (
			queryData &&
			Object.keys(queryData).length !== 0 &&
			isJson(queryData.getFile.content)
		) {
			addTab(queryData.getFile)
		}
	}, [queryData, selectedFile])

	const addTab = file => {
		const tabData = {
			name: file.name,
			content: file.content,
		}
		addTabMutation({
			variables: {
				file: tabData,
			},
		})
		dispatch({ type: 'addTab', payload: file })
	}

	const closeAllTabs = () => {
		removeAllTabsMutation()
		dispatch({ type: 'closeAllTabs' })
	}

	if (state.tabs.length === 0) {
		return <main id="main">Select a file from the explorer.</main>
	}
	return (
		<main id="main">
			<Tabs
				index={state.currentTab}
				onChange={index =>
					dispatch({ type: 'setTabIndex', payload: index })
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
									removeTabMutation({
										variables: {
											index,
										},
									})
									dispatch({
										type: 'removeTab',
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
				<span onClick={() => dispatch({ type: 'leftTab' })}>
					{CaretLeftIcon}
				</span>
				<span onClick={() => dispatch({ type: 'rightTab' })}>
					{CaretRightIcon}
				</span>
				<span
					onClick={() =>
						dispatch({
							type: 'toggleTabDropdown',
							payload: !state.isTabDropDownVisible,
						})
					}
				>
					{state.isTabDropDownVisible ? CaretUpIcon : CaretDownIcon}
				</span>
				{state.isTabDropDownVisible && (
					<div id="tab__options">
						<ul>
							<li onClick={() => closeAllTabs()}>
								Close All Tabs
							</li>
						</ul>
					</div>
				)}
			</div>
		</main>
	)
}

export default Main
