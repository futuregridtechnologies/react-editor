import React from 'react'
import RenderTree from '../components/RenderTree'

// Assets
import { CollapseLeftIcon, ExpandRightIcon } from '../assets/Icons'

const Sidebar = ({ isSidebarCollapsed, setSidebarState }) => {
    return (
        <aside id="sidebar">
            <div id="sidebar__header">
                <div
                    id="sidebar__header__collapse"
                    onClick={() => setSidebarState(!isSidebarCollapsed)}
                >
                    {isSidebarCollapsed ? ExpandRightIcon : CollapseLeftIcon}
                </div>
            </div>
            <div id="sidebar__explorer">
                <RenderTree />
            </div>
        </aside>
    )
}

export default Sidebar
