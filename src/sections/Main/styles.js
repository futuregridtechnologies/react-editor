import styled, { css } from 'styled-components'

export const MainWrapper = styled.main(
    ({ isSidebarVisible }) => css`
        width: calc(100vw - ${isSidebarVisible ? '240px' : '40px'});
        grid-area: main;
        border-left: 1px solid var(--border);
        position: relative;
        ${isSidebarVisible &&
            css`
                [data-reach-tab-list],
                [data-reach-tab-panels] {
                    width: calc(100vw - 40px);
                }
            `}

        [data-reach-tabs] {
            height: 100%;
            display: grid;
            grid-template-rows: 40px 1fr;
        }

        [data-reach-tab-list],
        [data-reach-tab-panels] {
            width: calc(100vw - 240px);
        }

        [data-reach-tab-list] {
            display: flex;
            overflow-x: auto;
            overflow-y: hidden;
            border-bottom: 1px solid var(--border);
            button {
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
            }
        }

        [data-reach-tab-panel] {
            height: calc(100vh - 72px);
            &:focus {
                outline: none;
            }
        }

        #tabs__navigation {
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
        }
        #tab__options {
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
        }
    `
)
