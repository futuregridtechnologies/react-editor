import React from 'react'
import Editor from '../components/Editor/Editor'

import { Context } from '../state/context'

// Import Tabs Components
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'

import fetchCall from '../utils/fetchCall'

import { GET_FILE_FETCH } from '../queries/getFile'

// Import Icons
import {
	CloseIcon,
	CaretLeftIcon,
	CaretRightIcon,
	CaretDownIcon,
	CaretUpIcon,
} from '../assets/Icons'

const Main = () => {
	const { state, dispatch } = React.useContext(Context)

	React.useEffect(() => {
		if (state.currentFile.path !== '') {
			const body = JSON.stringify({
				query: GET_FILE_FETCH,
				variables: {
					path: state.currentFile.path,
				},
			})
			fetchCall(body).then(({ data }) => {
				const { getFile } = data
				dispatch({ type: 'ADD_TAB', payload: getFile })
			})
		}
	}, [state.currentFile])

	const closeAllTabs = () => {
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
