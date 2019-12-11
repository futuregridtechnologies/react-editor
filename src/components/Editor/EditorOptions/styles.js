import styled from 'styled-components'

export const EditorOptionsWrapper = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    padding: 0 var(--spacer-1);
    grid-area: head;
    .btn__icon {
        background: transparent;
        width: 40px;
        height: 40px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
`
