/** @format */

// components/Button.js
import styled from "styled-components";

const LoginMain = styled.div`
    background-color: #f9f5f6;
    .login-main {
        position: relative;
        margin-top: 250px;
        background-color: #fff;
        &::before {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            background-image: url(../../elips-img.png);
            background-size: cover;
            width: 100%;
            height: 300px;
        }
        .login-main-inner {
            padding: 70px 15px 15px 15px;
            position: relative;
            z-index: 9;
            .link-bank-btn {
                margin-bottom: 15px;
            }
            h1 {
                /* font-family: 'Public Sans', sans-serif; */
                font-size: 24px;
                line-height: 32px;
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
                    label {
                        margin-bottom: 8px;
                        color: #64748b;
                        display: block;
                        font-size: 14px;
                    }
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
                .file-input {
                    margin-bottom: 12px;
                    label {
                        margin-bottom: 8px;
                        color: #64748b;
                        display: block;
                        font-size: 14px;
                    }
                    .file-input__input {
                        width: 0.1px;
                        height: 0.1px;
                        opacity: 0;
                        overflow: hidden;
                        position: absolute;
                        z-index: -1;
                    }
                    .file-input__label {
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        height: 120px;
                        border: 1px solid #cbd5e1;
                        border-radius: 12px;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        padding: 10px;
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
