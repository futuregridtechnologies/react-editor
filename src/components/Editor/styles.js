import styled from 'styled-components'

export const EditorWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 48px 1fr;
    grid-template-areas: 'head head head head' 'main main main main';
    & > section {
        grid-area: main;
    }
    &.withTemplates {
        grid-template-areas: 'head head head head' 'main main main aside';
    }
    &.withHistory {
        grid-template-areas: 'head head head head' 'main main main aside';
    }
`
