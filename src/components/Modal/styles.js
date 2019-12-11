import styled from 'styled-components'

export const StyledModal = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ModalCard = styled.div`
    height: auto;
    width: 480px;
    min-height: 432px;
    background: #fff;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`

export const Styledheader = styled.header`
    height: 32px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
`

export const StyledBody = styled.main`
    padding: 12px;
    flex: 1;
    max-height: 360px;
    overflow-y: auto;
`

export const StyledFooter = styled.footer`
    height: 40px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    border-top: 1px solid var(--border);
`
