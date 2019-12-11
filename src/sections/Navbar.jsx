import React from 'react'
import RenderTree from '../components/RenderTree'

// Assets
import { CollapseLeftIcon, ExpandRightIcon } from '../assets/Icons'

const Navbar = ({ isNavbarCollapsed, setNavbarState }) => {
    return (
        <aside id="navbar">
            <div id="navbar__header">
                <div
                    id="navbar__header__collapse"
                    onClick={() => setNavbarState(!isNavbarCollapsed)}
                >
                    {isNavbarCollapsed ? ExpandRightIcon : CollapseLeftIcon}
                </div>
            </div>
            <div id="navbar__explorer">
                <RenderTree />
            </div>
        </aside>
    )
}

export default Navbar
