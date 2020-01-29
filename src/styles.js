import styled, { css, createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:200,300,400,500,600,700&display=swap');
    * {
        box-sizing: border-box;
        font-family: 'IBM Plex Sans', sans-serif;
    }

    body {
        overflow: hidden;
        font-family: 'IBM Plex Sans', sans-serif;
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
