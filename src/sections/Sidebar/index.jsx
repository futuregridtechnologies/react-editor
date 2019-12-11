import React from 'react'

// Components
import { RenderTree } from '../../components'

// Styles
import { SidebarWrapper, SidebarActions, Header, FileExplorer } from './styles'

// Assets
import { CollapseLeftIcon, ExpandRightIcon } from '../../assets/Icons'

const Sidebar = ({ isSidebarCollapsed, setSidebarState }) => {
    return (
        <SidebarWrapper id="sidebar">
            <Header id="sidebar__header">
                <SidebarActions
                    id="sidebar__header__collapse"
                    onClick={() => setSidebarState(!isSidebarCollapsed)}
                >
                    {isSidebarCollapsed ? ExpandRightIcon : CollapseLeftIcon}
                </SidebarActions>
            </Header>
            <FileExplorer id="sidebar__explorer">
                <RenderTree />
            </FileExplorer>
        </SidebarWrapper>
    )
}

export default Sidebar
