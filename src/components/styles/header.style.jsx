// components/Button.js
import styled from "styled-components";

const Header = styled.div`
    display: flex;
    padding: 26px 32px;
    border-bottom: 1px solid rgba(208, 213, 221, 0.6);
    justify-content: space-between;
    .header-left {
        display: flex;
        align-items: center;
        .logo-header {
            padding-right: 32px;
            &.padding-diff-block {
                padding-right: 12px;
            }
            img {
                width: 135px;
            }
            .back-arrow {
                img {
                    width: 14px;
                }
            }
        }
        .map-header {
            padding-right: 32px;
            .map-header-link {
                display: flex;
                align-items: center;
                padding: 11px 16px;
                box-shadow:
                    0px 1px 3px rgba(16, 24, 40, 0.1),
                    0px 1px 2px rgba(16, 24, 40, 0.06);
                background-color: #f9c93c;
                border-radius: 12px;
                cursor: pointer;
                p {
                    font-weight: 400;
                    font-size: 14px;
                    color: #fff;
                    padding: 0px 5px 0px 8px;
                }
                .arrow-icon {
                    width: 26px;
                }
            }
        }
        .toggle-header {
            .toggle-header-inner {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 11px 16px;
                border: 1px solid rgba(208, 213, 221, 0.6);
                border-radius: 8px;
                box-shadow:
                    0px 1px 3px rgba(16, 24, 40, 0.1),
                    0px 1px 2px rgba(16, 24, 40, 0.06);
                p {
                    padding-right: 8px;
                    color: #667085;
                    font-size: 14px;
                    font-weight: 500;
                }
            }
        }
        .calender-block {
            display: flex;
            align-items: center;
            .montag-block {
                margin-right: 12px;
                padding: 12px;
                border: 1px solid #d0d5dd;
                border-radius: 8px;
                width: 175px;
                background-color: #f5faff;
                color: #175cd3;
                font-weight: 500;
                min-width: fit-content;
            }
            .hub-block {
                margin-right: 12px;
                padding: 12px;
                border: 1px solid #d0d5dd;
                border-radius: 8px;
                width: 175px;
                background-color: #f9f5ff;
                color: #6938ef;
                min-width: fit-content;
                font-weight: 500;
            }
        }
    }
    .header-right {
        display: flex;
        align-items: center;
        .header-right-cart {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 32px;
            position: relative;
            cursor: pointer;
            padding: 11px 16px;
            border: 1px solid rgba(208, 213, 221, 0.6);
            border-radius: 8px;
            box-shadow:
                0px 1px 3px rgba(16, 24, 40, 0.1),
                0px 1px 2px rgba(16, 24, 40, 0.06);
            p {
                padding: 0px 12px;
                font-weight: 700;
                font-size: 14px;
                color: #12b76a;
            }
            .arrow-icon {
                width: 26px;
            }
        }
        .header-right-dropdwon {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 11px 16px;
            border: 1px solid rgba(208, 213, 221, 0.6);
            border-radius: 8px;
            box-shadow:
                0px 1px 3px rgba(16, 24, 40, 0.1),
                0px 1px 2px rgba(16, 24, 40, 0.06);
            p {
                padding: 0px 12px 0px 0px;
                font-weight: 600;
                font-size: 14px;
                color: #344054;
            }
            .arrow-icon {
                width: 26px;
            }
        }
        .header-right-btn {
            display: flex;
            align-items: center;
            border: none;
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
    }
    .cart-dropdown {
        position: absolute;
        width: 435px;
        border: 1px solid rgba(208, 213, 221, 0.6);
        box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.15);
        z-index: 9;
        background-color: #fff;
        border-radius: 12px;
        top: 85px;
        right: 215px;
        .cart-dropdown-inner {
            padding: 32px 24px;
            .cart-footer {
                padding: 24px 12px 0px 12px;
                .btn-footer {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    border: none;
                    background-color: #f9c93c;
                    border-radius: 30px;
                    padding: 16px;
                    justify-content: center;
                    outline: none;
                    box-shadow: none;
                    p {
                        font-size: 14px;
                        color: #fff;
                        font-weight: 600;
                        padding: 0px 8px;
                    }
                    h4 {
                        font-size: 18px;
                        color: #fff;
                        font-weight: 600;
                    }
                }
            }
            .cart-dropdown-inner-top {
                display: flex;
                align-items: center;
                border-bottom: 1px solid rgba(208, 213, 221, 0.6);
                padding-bottom: 16px;
                h5 {
                    font-size: 16px;
                    padding-left: 8px;
                    color: #000;
                }
            }
            .cart-dropdown-block {
                .cart-dropdown-block-inner {
                    height: 274px;
                    overflow-y: auto;
                    .cart-dropdown-block-inner-block {
                        padding: 20px 0px;
                        border-bottom: 1px solid rgba(208, 213, 221, 0.6);
                        display: flex;
                        .img-block {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 96px;
                            height: 96px;
                            border: 1px solid rgba(208, 213, 221, 0.6);
                            padding: 10px;
                            border-radius: 12px;
                            > img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        .cart-block {
                            display: flex;
                            padding: 12px;
                            width: 75%;
                            justify-content: space-between;
                            .cart-block-left {
                                width: 70%;
                                h5 {
                                    color: #000;
                                    font-weight: 500;
                                    font-size: 18px;
                                    margin-bottom: 8px;
                                }
                                p {
                                    color: #667085;
                                    font-size: 12px;
                                    font-weight: 400;
                                    line-height: 14px;
                                    padding: 0px;
                                }
                            }
                            .cart-price {
                                width: 30%;
                                display: flex;
                                align-items: flex-end;
                                flex-direction: column;
                                h3 {
                                    color: #f9c93c;
                                    font-weight: 600;
                                    font-size: 18px;
                                }
                                input {
                                    width: 53px;
                                    height: 34px;
                                    border-radius: 8px;
                                    border: 1px solid rgba(208, 213, 221, 0.6);
                                    font-size: 14px;
                                    line-height: 14px;
                                    text-align: center;
                                    outline: none;
                                    color: #000;
                                    font-weight: 500;
                                    &::placeholder {
                                        color: #000;
                                    }

                                    &::-ms-input-placeholder {
                                        color: #000;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default Header;
