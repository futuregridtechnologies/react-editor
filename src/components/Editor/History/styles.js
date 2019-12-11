import styled from 'styled-components'

export const HistoryPanel = styled.div`
    grid-area: aside;
    overflow-y: auto;
    height: calc(100vh - 88px);
    border-left: 1px solid var(--border);
    header {
        padding: var(--spacer-2) var(--spacer-2) 0 var(--spacer-2);
        border-bottom: 1px solid var(--border);
        margin-bottom: calc(var(--base-pt) * 2px);
    }
    h3 {
        font-size: 24px;
        margin-bottom: calc(var(--base-pt) * 2px);
    }
    main {
        padding: 0 var(--spacer-2);
    }
`

export const Commit = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    padding: var(--spacer-2);
    border: 1px solid var(--border);
    margin-bottom: calc(var(--base-pt) * 2px);
    border-radius: calc(var(--base-pt) * 0.5px);
    & > div {
        display: flex;
        justify-content: space-between;
    }
    & > span {
        margin-top: auto;
    }
    &:hover button {
        visibility: visible;
    }
    button {
        height: 24px;
        border: none;
        color: #fff;
        cursor: pointer;
        background: grey;
        visibility: hidden;
        border-radius: calc(var(--base-pt) * 0.5px);
    }
`
