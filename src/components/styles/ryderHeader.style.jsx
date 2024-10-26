// components/Button.js
import styled from "styled-components";
const Header = styled.div`
    position: relative;
    border-bottom: 1px solid #cbd5e1;
    padding: 19px 16px;
    box-shadow: 0px 11px 23px rgba(16, 24, 40, 0.08);
    .header-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header-block-left {
            display: flex;
            align-items: center;
            .header-menu-block {
                padding-left: 12px;
                span {
                    padding: 13px 12px;
                    font-size: 12px;
                    outline: none;
                    box-shadow: none;
                    background-color: transparent;
                    border: 1px solid #d0d5dd;
                    color: #175cd3;
                    display: block;
                    font-weight: 500;
                    border-radius: 8px;
                }
            }
            .error-block {
                background-color: #fffbfa;
                display: flex;
                align-items: center;
                border-radius: 12px;
                cursor: pointer;
                padding: 8px 12px;
                border: 1px solid #d0d5dd;
                span {
                    padding-left: 4px;
                    color: #d92d20;
                    font-size: 14px;
                    font-weight: 600;
                }
            }
            .order-btn {
                padding: 8px 12px;
                border-radius: 8px;
                border: 1px solid #d0d5dd;
                p {
                    color: #000;
                    font-size: 12px;
                    line-height: 14px;
                    font-weight: 500;
                }
            }
            .problem-text {
                padding: 12px 0px;
                h4 {
                    font-size: 18px;
                    line-height: 20px;
                    color: #000;
                    font-weight: 600;
                }
            }
        }
        .header-block-right {
            .btn-header {
                background-color: #f9c93c;
                border-radius: 8px;
                padding: 13px 12px;
                justify-content: center;
                outline: none;
                box-shadow: none;
                font-size: 12px;
                color: #fff;
                font-family: "Public Sans", sans-serif;
                font-weight: 500;
            }
            .profile-btn {
                border-radius: 8px;
                padding: 8px 12px;
                display: flex;
                align-items: center;
                border: 1px solid #d0d5dd;
                background: transparent;
                span {
                    color: #000;
                    font-size: 12px;
                    font-weight: 500;
                    padding-right: 8px;
                }
            }
            .save-btn-block {
                padding: 8px 12px;
                border-radius: 8px;
                border: 1px solid #d0d5dd;
                color: #000;
                font-size: 12px;
                line-height: 14px;
                font-weight: 500;
                background: transparent;
                box-shadow: none;
            }
        }
    }
`;

export default Header;
