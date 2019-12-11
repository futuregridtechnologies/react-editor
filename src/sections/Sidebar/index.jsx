import React from 'react'

// State
import { Context } from '../../state'

// Components
import { FileExplorer } from '../../components'

// Styles
import { SidebarWrapper, SidebarActions, Header } from './styles'

// Assets
import { ExpandIcon, CollapseIcon } from '../../assets/Icons'

const Sidebar = () => {
    const { state, dispatch } = React.useContext(Context)
    return (
        <SidebarWrapper id="sidebar">
            <Header id="sidebar__header">
                <SidebarActions
                    id="sidebar__header__collapse"
                    onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                >
                    {state.isSidebarVisible ? <ExpandIcon /> : <CollapseIcon />}
                </SidebarActions>
            </Header>
            <FileExplorer id="sidebar__explorer" />
        </SidebarWrapper>
    )
}

export default Sidebar
