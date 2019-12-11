import styled from 'styled-components'

import Modal from '../../Modal'

export const StyledModal = styled(Modal)`
    header {
        display: grid;
        grid-template-columns: 1fr 80px;
        grid-column-gap: var(--spacer-1);
        input,
        button {
            height: 32px;
        }
        input {
            padding-left: var(--spacer-1);
        }
    }
`

export const StyledFileSection = styled.section`
    height: auto;
    border-bottom: 1px solid var(--border);
    padding: var(--spacer-2) 0;
    h2 {
        font-size: 20px;
        padding-bottom: var(--spacer-2);
    }
    div {
        height: 40px;
        padding: 0 var(--spacer-1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--spacer-1);
        border: 1px solid var(--border);
        border-radius: calc(var(--base-pt) * 0.5px);
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
    }
`
