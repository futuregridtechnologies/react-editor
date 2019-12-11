import styled, { css } from 'styled-components'
import { Tabs, TabList, Tab, TabPanel } from '@reach/tabs'

export const MainWrapper = styled.main(
    ({ isSidebarVisible }) => css`
        grid-area: main;
        border-left: 1px solid var(--border);
        position: relative;
        width: calc(100vw - ${isSidebarVisible ? '240px' : '40px'});
    `
)

export const TabsNav = styled.div`
    background: #fff;
    position: absolute;
    top: 0;
    right: 0;
    height: 40px;
    width: auto;
    border-left: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    z-index: 100;
    span {
        width: 40px;
        height: 40px;
        float: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
`

export const TabOptions = styled.div`
    background: #fff;
    border: 1px solid var(--border);
    top: 48px;
    right: 0;
    position: absolute;
    padding: 8px 0;
    width: 240px;
    ul {
        li {
            cursor: pointer;
            height: 32px;
            line-height: 33px;
            padding: 0 16px;
            &:hover {
                background: rgba(#000, 0.1);
            }
        }
    }
`
export const StyledTabs = styled(Tabs)`
    height: 100%;
    display: grid;
    grid-template-rows: 40px 1fr;
`

export const StyledTabList = styled(TabList)`
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid var(--border);
`

export const StyledTab = styled(Tab)`
    flex: 1;
    height: 39px;
    padding: 0;
    max-width: 180px;
    min-width: 180px;
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    border-right: 1px solid var(--border);
    span:first-child {
        height: 39px;
        width: calc(100% - 39px);
        line-height: 41px;
        padding-left: 16px;
        &:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
    span:last-child {
        width: 39px;
        height: 39px;
        visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
    &:hover {
        span:last-child {
            visibility: visible;
        }
    }
    &[aria-selected='true'] {
        border-bottom: 2px solid var(--border);
    }
`

export const StyledTabPanel = styled(TabPanel)`
    height: calc(100vh - 72px);
    &:focus {
        outline: none;
    }
`
