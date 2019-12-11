import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        --border: #E0C9C9;
        --icon-grey: #ab9494;
        --icon-color: #354E74;

        --base-pt: 8;
        --spacer-1: calc(var(--base-pt) * 1px);
        --spacer-2: calc(var(--base-pt) * 2px);
        --spacer-3: calc(var(--base-pt) * 3px);
        --spacer-4: calc(var(--base-pt) * 4px);
    }
    * {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    }

    body {
        overflow: hidden;
    }
`

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-areas: 'sidebar main';
    width: 100vw;
    height: 100vh;
    &.sidebar__collapsed {
        grid-template-columns: 40px 1fr;
        #sidebar__header__nav,
        #sidebar__explorer {
            display: none;
        }
        #main {
            width: calc(100vw - 40px);
            [data-reach-tab-list],
            [data-reach-tab-panels] {
                width: calc(100vw - 40px);
            }
        }
    }
`
