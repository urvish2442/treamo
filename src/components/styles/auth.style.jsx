// components/Button.js
import styled from "styled-components";

const LoginMain = styled.div`
    .login-main {
        position: relative;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-main-inner {
            width: 375px;
            h1 {
                /* font-family: 'Public Sans', sans-serif; */
                font-size: 45px;
                line-height: 60px;
                color: #000;
                font-weight: 600;
                margin-bottom: 12px;
            }
            .form-login {
                .two-from-group {
                    display: flex;
                    margin: 0px -4px;
                    .form-group {
                        width: 50%;
                        padding: 0px 4px;
                    }
                }
                .form-group {
                    margin-bottom: 12px;
                    input {
                        width: 100%;
                        height: 58px;
                        border: 1px solid #cbd5e1;
                        border-radius: 12px;
                        padding: 12px;
                        font-family: "Public Sans", sans-serif;
                        font-size: 13px;
                        outline: none;
                        box-shadow: none;
                        color: #64748b;
                        &::placeholder {
                            color: #64748b;
                        }

                        &::-ms-input-placeholder {
                            color: #64748b;
                        }
                    }
                }
                .btn-form {
                    margin-bottom: 4px;
                    .button-common {
                        width: 100%;
                        background-color: #f9c93c;
                        font-size: 16px;
                        line-height: 24px;
                        border-radius: 12px;
                        color: #fff;
                        font-weight: 700;
                        border: none;
                        padding: 12px;
                    }
                }
                .last-link {
                    text-align: center;
                    p {
                        /* font-family: 'Public Sans', sans-serif; */
                        font-size: 13px;
                        color: #64748b;
                        a {
                            color: #f9c93c;
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }
`;

export default LoginMain;
