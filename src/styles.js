import styled, { css, createGlobalStyle } from 'styled-components'

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
        box-sizing: border-box;
        font-family: sans-serif;
    }

    body {
        overflow: hidden;
        font-family: sans-serif;
    }
`

export const Wrapper = styled.div(
    ({ isSidebarVisible }) => css`
        display: grid;
        grid-template-columns: ${isSidebarVisible ? '240px 1fr' : '40px 1fr'};
        grid-template-areas: 'sidebar main';
        width: 100vw;
        height: 100vh;
    `
)
