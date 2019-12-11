import styled from 'styled-components'

export const SidebarWrapper = styled.aside`
    grid-area: sidebar;
`

export const Header = styled.header`
    height: 40px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const SidebarActions = styled.div`
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid var(--border);
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`

export const FileExplorer = styled.div`
    padding: var(--spacer-2);
    overflow-y: auto;
    height: calc(100vh - 40px);
`
