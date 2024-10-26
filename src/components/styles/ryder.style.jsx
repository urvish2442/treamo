// components/Button.js
import styled from "styled-components";
const CommonBlock = styled.div`
    position: relative;
    .common-block-ryder {
        padding: 32px 16px;
        .edit-profile-block {
            position: relative;
            .edit-profile-block-three {
                .edit-profile-block-three-block {
                    width: 100%;
                    padding: 0px 0px 12px;
                    .edit-profile-block-three-block-inner {
                        padding: 32px 12px 32px 12px;
                        border-radius: 12px;
                        border: 1px solid #d0d5dd;
                        .text-red-500 {
                            font-size: 10px;
                            line-height: 12px;
                        }
                        .top-edit-profile-block {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-bottom: 20px;
                            h3 {
                                color: #667085;
                                padding-left: 10px;
                                font-size: 16px;
                                line-height: 16px;
                            }
                        }
                        .form-block-inner {
                            .form-block-inner-block {
                                display: flex;
                                margin: 0px -4px;
                                &.width-full-block {
                                    .form-block-inner-block-input {
                                        width: 100%;
                                        input {
                                            width: 80%;
                                        }
                                    }
                                }
                                .form-block-inner-block-input {
                                    width: 50%;
                                    padding: 0px 4px 12px;
                                    .input-box {
                                        /* display: flex;
                                        align-items: center;
                                        height: 58px;
                                        border-radius: 12px;
                                        border: 1px solid #d0d5dd;
                                        padding: 12px; */
                                        label {
                                            font-size: 13px;
                                            line-height: 15px;
                                            color: #667085;
                                            padding-right: 8px;
                                            margin: 0px;
                                        }
                                        input {
                                            border: none;
                                            outline: none;
                                            box-shadow: none;
                                            color: #000;
                                            font-size: 13px;
                                            line-height: 13px;
                                            background: transparent;
                                            height: 58px;
                                            border-radius: 12px;
                                            border: 1px solid #d0d5dd;
                                            padding: 12px;
                                            width: 100%;
                                            &::placeholder {
                                                color: #667085;
                                                opacity: 1; /* Firefox */
                                            }

                                            &::-ms-input-placeholder {
                                                /* Edge 12 -18 */
                                                color: #667085;
                                            }
                                        }
                                    }
                                }
                            }
                            .select-form-block {
                                .select-block-fetishes {
                                    height: 58px;
                                    margin-bottom: 12px;
                                    .react-select__control {
                                        height: 58px;
                                        border: 1px solid #d0d5dd;
                                        border-radius: 12px;
                                        .react-select__placeholder {
                                            color: #000;
                                            font-size: 13px;
                                            line-height: 13px;
                                        }
                                        .react-select__input-container {
                                            color: #000;
                                            font-size: 13px;
                                            line-height: 13px;
                                        }
                                        .react-select__input {
                                            color: #000;
                                            font-size: 13px;
                                            line-height: 13px;
                                        }
                                    }
                                    .react-select__indicators {
                                        .react-select__indicator-separator {
                                            display: none;
                                        }
                                        .react-select__indicator {
                                            svg {
                                                path {
                                                    fill: #000;
                                                }
                                            }
                                        }
                                    }
                                }
                                .react-select__menu {
                                    /* border: 1px solid #d0d5dd; */
                                    border-radius: 12px;
                                    padding: 0px;
                                    .react-select__menu-list {
                                        padding: 0px;
                                        overflow: hidden;
                                        border-radius: 12px;
                                    }
                                    .react-select__option {
                                        color: #000;
                                        font-size: 13px;
                                        line-height: 13px;
                                        &.react-select__option--is-focused {
                                            background-color: #f9c93c;
                                        }
                                    }
                                }
                            }
                            .form-block-inner-block-flex {
                                padding: 0px 4px 12px;
                                width: 50%;
                                input {
                                    border: none;
                                    outline: none;
                                    box-shadow: none;
                                    color: #000;
                                    height: 58px;
                                    font-size: 13px;
                                    line-height: 13px;
                                    border-radius: 12px;
                                    width: 100%;
                                    padding: 12px;
                                    border: 1px solid #d0d5dd;
                                    background: transparent;
                                    &::placeholder {
                                        color: #667085;
                                        opacity: 1; /* Firefox */
                                    }

                                    &::-ms-input-placeholder {
                                        /* Edge 12 -18 */
                                        color: #667085;
                                    }
                                }
                            }
                        }
                        .file-input {
                            margin-bottom: 12px;
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
                                flex-direction: column;
                                height: 120px;
                                border: 1px solid #cbd5e1;
                                border-radius: 12px;
                                align-items: center;
                                justify-content: center;
                                width: 100%;
                                padding: 10px;
                                span {
                                    margin-top: 8px;
                                    color: #64748b;
                                    display: block;
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .shift-common-block {
        position: relative;
        border-radius: 16px;
        border: 1px solid #d0d5dd;
        padding: 16px;
        margin-bottom: 12px;
        h2 {
            margin-bottom: 12px;
            font-size: 18px;
            line-height: 20px;
            color: #000;
            font-weight: 500;
        }
        .shift-common-time {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
            h2 {
                margin-bottom: 0px;
            }
            span {
                padding: 9px 12px;
                font-weight: 700;
                font-size: 12px;
                border: 1px solid #039855;
                border-radius: 8px;
                background-color: #f6fef9;
                color: #039855;
            }
        }
        .shift-common-block-time {
            border-radius: 8px;
            border: 1px solid #d0d5dd;
            padding: 12px 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
            p {
                color: #667085;
                font-size: 12px;
                font-weight: 500;
            }
            span {
                color: #000;
                font-size: 12px;
                font-weight: 500;
            }
        }
        .shift-location {
            border-radius: 8px;
            border: 1px solid #d0d5dd;
            padding: 11px 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
            p {
                color: #667085;
                font-size: 12px;
                font-weight: 500;
                width: 80%;
            }
            .shift-location-link {
                width: 52px;
                display: flex;
                align-items: center;
                border-radius: 8px;
                border: 1px solid #d0d5dd;
                padding: 5px 8px;
                img {
                    &:last-child {
                        position: relative;
                        top: 4px;
                    }
                }
            }
        }
        .btn-block-shift {
            margin-top: 24px;
            button {
                box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.1);
                border: 1px solid #d0d5dd;
                padding: 14px 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                border-radius: 30px;
                span {
                    font-weight: 500;
                    padding-left: 8px;
                    font-size: 14px;
                }
            }
        }
        .info-block-last {
            display: flex;
            align-items: center;
            margin-top: 10px;
            p {
                padding-left: 8px;
                font-style: italic;
                color: #667085;
                font-size: 12px;
            }
        }
    }
    .shift-common-error {
        position: relative;
        .shift-common-error-inner {
            cursor: pointer;
            background-color: #fffbfa;
            border-radius: 12px;
            margin-bottom: 22px;
            border: 1px solid #d0d5dd;
            padding: 20px 12px;
            display: flex;
            align-items: center;
            p {
                padding-left: 5px;
                font-size: 14px;
                line-height: 16px;
                color: #d92d20;
                font-weight: 600;
            }
        }
    }
    .location-selector {
        position: relative;
        height: 100vh;
        .location-selector-bottom {
            position: absolute;
            bottom: 22px;
            left: 0px;
            right: 0px;
            padding: 0px 16px;
            .location-selector-bottom-inner {
                border-radius: 12px;
                box-shadow: 0px -4px 130px 0px rgba(0, 0, 0);
                background-color: #202020;
                padding: 32px 16px;
                button {
                    background-color: #f9c93c;
                    border-radius: 12px;
                    padding: 13px 12px;
                    justify-content: center;
                    outline: none;
                    box-shadow: none;
                    font-size: 18px;
                    color: #fff;
                    font-weight: 500;
                    width: 100%;
                }
            }
        }
    }
    .shift-common-calender {
        position: relative;
        padding: 30px 20px;
        border: 1px solid #d0d5dd;
        border-radius: 12px;
        margin-bottom: 140px;
        .rdp-root {
            .rdp-months {
                display: block;
                width: 100%;
                max-width: 100%;
                flex-wrap: nowrap;
                margin-bottom: 10px;
                .rdp-nav {
                    display: none;
                }
                .rdp-month {
                    padding: 0px;
                    width: 100%;
                    margin-bottom: 15px;
                    .rdp-month_caption {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .rdp-caption_label {
                            font-size: 24px;
                            line-height: 32px;
                            margin-bottom: 12px;
                            font-weight: 500;
                            color: #000;
                        }
                    }
                    .rdp-month_grid {
                        width: 100%;
                        thead {
                            .rdp-weekdays {
                                th {
                                    font-size: 16px;
                                    line-height: 24px;
                                    color: #000;
                                    font-weight: 400;
                                    padding: 10px;
                                }
                            }
                        }
                        tbody {
                            .rdp-week {
                                .rdp-day {
                                    border-radius: 24px;
                                    color: #000;
                                    position: relative;
                                    vertical-align: center;
                                    align-items: center;
                                    text-align: center;
                                    padding: 10px;
                                    font-size: 16px;
                                    &.my-closed-day {
                                        button {
                                            &::before {
                                                content: "";
                                                position: absolute;
                                                bottom: 0px;
                                                width: 5px;
                                                height: 5px;
                                                border-radius: 50%;
                                                background-color: #f04438;
                                                left: 0px;
                                                right: 0px;
                                                margin: 0 auto;
                                            }
                                        }
                                    }
                                    &.my-weekend-day {
                                        button {
                                            &::before {
                                                content: "";
                                                position: absolute;
                                                bottom: 0px;
                                                width: 5px;
                                                height: 5px;
                                                border-radius: 50%;
                                                background-color: #7f56d9;
                                                left: 0px;
                                                right: 0px;
                                                margin: 0 auto;
                                            }
                                        }
                                    }
                                    &.my-open-day {
                                        button {
                                            &::before {
                                                content: "";
                                                position: absolute;
                                                bottom: 0px;
                                                width: 5px;
                                                height: 5px;
                                                border-radius: 50%;
                                                background-color: #027a48;
                                                left: 0px;
                                                right: 0px;
                                                margin: 0 auto;
                                            }
                                        }
                                    }
                                    &.available {
                                        button {
                                            &::before {
                                                content: "";
                                                position: absolute;
                                                bottom: -8px;
                                                width: 5px;
                                                height: 5px;
                                                border-radius: 50%;
                                                background-color: #027a48;
                                                left: 0px;
                                                right: 0px;
                                                margin: 0 auto;
                                            }
                                        }
                                    }
                                    &.accepted {
                                        button {
                                            &::before {
                                                content: "";
                                                position: absolute;
                                                bottom: -8px;
                                                width: 5px;
                                                height: 5px;
                                                border-radius: 50%;
                                                background-color: #175cd3;
                                                left: 0px;
                                                right: 0px;
                                                margin: 0 auto;
                                            }
                                        }
                                    }
                                    &.declined {
                                        button {
                                            &::before {
                                                content: "";
                                                position: absolute;
                                                bottom: -8px;
                                                width: 5px;
                                                height: 5px;
                                                border-radius: 50%;
                                                background-color: #f04438;
                                                left: 0px;
                                                right: 0px;
                                                margin: 0 auto;
                                            }
                                        }
                                    }
                                    &.requested {
                                        button {
                                            &::before {
                                                content: "";
                                                position: absolute;
                                                bottom: -8px;
                                                width: 5px;
                                                height: 5px;
                                                border-radius: 50%;
                                                background-color: #fab300;
                                                left: 0px;
                                                right: 0px;
                                                margin: 0 auto;
                                            }
                                        }
                                    }
                                    &.rdp-selected,
                                    &:hover {
                                        color: #f9c93c;
                                        background-color: rgba(
                                            249,
                                            201,
                                            60,
                                            0.15
                                        );
                                        button {
                                            color: #f9c93c;
                                        }
                                    }

                                    button {
                                        margin: 0 auto;
                                        border: none;
                                        color: #000;
                                        font-weight: 400;
                                        position: relative;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .btn-calender {
            margin-bottom: 20px;
            button {
                background-color: #f9c93c;
                border-radius: 12px;
                padding: 13px 12px;
                justify-content: center;
                outline: none;
                box-shadow: none;
                font-size: 18px;
                color: #fff;
                font-weight: 500;
                width: 100%;
                display: flex;
                align-items: center;
                span {
                    padding-left: 10px;
                }
            }
        }
    }
    .label-block-close {
        padding: 0px;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: #fff;
        border-radius: 12px 12px 0px 0px;
        box-shadow: 10px 0px 40px 0px rgba(0, 0, 0, 0.15);
        .label-block-close-block {
            padding: 20px 15px 10px 15px;
            display: flex;
            flex-wrap: wrap;
            .label-block-close-block-flex {
                width: 50%;
                padding: 0px 5px 10px;
            }
            .label-block-close-inner {
                border-radius: 8px;
                background-color: #fef3f2;
                display: flex;
                align-items: center;
                padding: 10px;
                span {
                    display: block;
                    background-color: #f04438;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
                h3 {
                    font-size: 16px;
                    line-height: 24px;
                    color: #f04438;
                    padding-left: 10px;
                    font-weight: 400;
                }
                &.weekend-block {
                    background-color: #f9f5ff;
                    span {
                        background-color: #7f56d9;
                    }
                    h3 {
                        color: #7f56d9;
                    }
                }
                &.avilable-layer {
                    background-color: #f6fef9;
                    span {
                        background-color: #027a48;
                    }
                    h3 {
                        color: #027a48;
                    }
                }
                &.requested-block {
                    background-color: #fef9eb;
                    span {
                        background-color: #f9c93c;
                    }
                    h3 {
                        color: #f9c93c;
                    }
                }
                &.layer-block {
                    background-color: #f5faff;
                    span {
                        background-color: #2359d7;
                    }
                    h3 {
                        color: #2359d7;
                    }
                }
            }
        }
    }
    .profile-block-inner {
        .profile-details {
            border-radius: 12px;
            border: 1px solid #d0d5dd;
            margin-bottom: 24px;
            text-align: center;
            padding: 16px;
            h2 {
                font-size: 30px;
                line-height: 38px;
                color: #000;
                margin-bottom: 10px;
                font-weight: 700;
            }
            p {
                color: #475467;
                font-size: 12px;
                line-height: 16px;
            }
        }
    }
    .profile-link {
        .profile-link-inner {
            a {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px;
                border-radius: 16px;
                border: 1px solid #d0d5dd;
                margin-bottom: 8px;
                .profile-icon-text {
                    display: flex;
                    align-items: center;
                    span {
                        padding-left: 8px;
                        color: #000;
                        font-size: 14px;
                        line-height: 20px;
                    }
                }
            }
        }
    }
    .shift-idle-block {
        border-radius: 16px;
        border: 1px solid #d0d5dd;
        padding: 16px;
        .clock-img-block {
            background-color: #f6fef9;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 140px;
            border: 1px solid #027a48;
            border-radius: 8px;
            padding: 12px;
            margin: 0 auto;
            margin-bottom: 24px;
            span {
                font-size: 22px;
                line-height: 24px;
                color: #027a48;
                font-weight: 600;
                padding-left: 8px;
            }
        }
        .shift-idle-block-inner {
            border-radius: 12px;
            border: 1px solid #d0d5dd;
            padding: 12px;
            margin-bottom: 24px;
            min-height: 300px;
            .shift-idle-block-inner-block {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 1px solid #d0d5dd;
                background-color: #fcfcfd;
                border-radius: 8px;
                padding: 8px;
                margin-bottom: 12px;
                .shift-idle-block-text {
                    display: flex;
                    align-items: center;
                    span {
                        color: #475467;
                        font-size: 12px;
                        line-height: 16px;
                        padding-left: 10px;
                    }
                }
            }
            .checkbox-custom {
                .form-group {
                    position: relative;
                    input {
                        padding: 0;
                        height: initial;
                        width: initial;
                        margin-bottom: 0;
                        display: none;
                        cursor: pointer;
                    }
                    label {
                        position: relative;
                        font-size: 16px;
                        line-height: 16px;
                        padding-left: 25px;
                        font-weight: 400;
                        color: #94a3b8;
                        cursor: pointer;
                        &::before {
                            content: "";
                            -webkit-appearance: none;
                            background-color: transparent;
                            border: 1px solid #94a3b8;
                            width: 16px;
                            height: 16px;
                            display: inline-block;
                            position: relative;
                            vertical-align: middle;
                            cursor: pointer;
                            position: absolute;
                            left: 0px;
                            top: 2px;
                        }
                    }
                }
                .form-group input:checked + label:after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 5px;
                    left: 6px;
                    width: 5px;
                    height: 9px;
                    border: solid #fff;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
                .form-group input:checked + label:before {
                    background-color: #f9c93c;
                    border-color: #f9c93c;
                }
            }
        }
        .btn-block-shift {
            button {
                box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.1);
                border: 1px solid #d0d5dd;
                padding: 14px 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                border-radius: 30px;
                background-color: #f2f4f7;
                span {
                    font-weight: 500;
                    padding-left: 8px;
                    font-size: 14px;
                    color: #667085;
                }
            }
            &.checked {
                button {
                    background-color: #ffffff;
                }
            }
        }
    }
    .commising-main {
        position: relative;
        padding-bottom: 50px;
        .commising-block {
            position: relative;
            .commising-product-block {
                padding-bottom: 24px;
                padding-top: 24px;
                border-bottom: 1px dashed #d0d5dd;
                &:first-child {
                    padding-top: 0px;
                }
                &:last-child {
                    border: none;
                }
                .commising-product-block-inner {
                    padding: 16px 12px;
                    border-radius: 8px;
                    border: 1px solid #d0d5dd;
                    box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.1);
                }
                .top-img-block {
                    display: flex;
                    margin-bottom: 12px;
                    .img-block {
                        border-radius: 12px;
                        border: 1px solid #d0d5dd;
                        padding: 8px;
                        width: 96px;
                        .img-block-inner {
                            background-color: #f8f8f8;
                            padding: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }
                    }
                    .top-img-block-text {
                        width: 70%;
                        padding-left: 12px;
                        padding-top: 8px;
                        h3 {
                            font-size: 18px;
                            color: #000;
                            padding-bottom: 8px;
                            font-weight: 500;
                        }
                        .top-img-block-text-inner {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            p {
                                color: #667085;
                                font-size: 14px;
                                line-height: 16px;
                            }
                            .top-img-block-text-pm {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                border-radius: 12px;
                                border: 1px solid #d0d5dd;
                                padding: 8px 3px;
                                width: 52px;
                                font-size: 16px;
                                line-height: 16px;
                                color: #000;
                                font-weight: 500;
                            }
                        }
                    }
                }
                .plus-minus-button {
                    display: flex;
                    margin: 0px -6px;
                    .plus-minus-button-inner {
                        width: 50%;
                        padding: 0px 6px;
                        button {
                            width: 100%;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 30px;
                            &.minus-btn {
                                background-color: #fefafa;
                                border: 1px solid #b32317;
                            }
                            &.plus-btn {
                                background-color: #f6fef9;
                                border: 1px solid #257947;
                            }
                        }
                    }
                }
            }
        }
        .commising-bottombar {
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            background-color: #fff;
            border-radius: 12px 12px 0px 0px;
            box-shadow: 10px 0px 40px 0px rgba(0, 0, 0, 0.15);
            padding: 20px;
            border: 1px solid #d0d5dd;
            button {
                background-color: #f9c93c;
                border-radius: 12px;
                padding: 12px;
                justify-content: center;
                outline: none;
                box-shadow: none;
                font-size: 18px;
                color: #fff;
                font-family: "Public Sans", sans-serif;
                font-weight: 500;
                width: 100%;
            }
        }
        .button-group {
            button {
                display: flex;
                align-items: center;
                background-color: #fff;
                border-radius: 30px;
                padding: 15px;
                border: 1px solid #d0d5dd;
                box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.1);
                border: 1px solid #d0d5dd;
                width: 100%;
                justify-content: center;
                margin-bottom: 12px;
                span {
                    font-size: 13px;
                    line-height: 13px;
                    padding-left: 5px;
                    color: #f04438;
                }
                &.second-btn {
                    margin-bottom: 0px;
                    span {
                        color: #1570ef;
                    }
                }
            }
        }
    }
    .delevery-target {
        position: relative;
        padding-bottom: 70px;
        .delevery-target-top {
            border-radius: 16px;
            border: 1px solid #d0d5dd;
            padding: 16px;
            margin-bottom: 12px;
            h2 {
                font-size: 18px;
                line-height: 22px;
                font-weight: 600;
                color: #000;
                margin-bottom: 12px;
                text-align: center;
            }
            .delevery-target-product {
                position: relative;
                max-height: 280px;
                overflow-y: scroll;
                padding-right: 5px;
                &::-webkit-scrollbar-track {
                    border-radius: 30px;
                    background-color: #f5f5f5;
                }
                &::-webkit-scrollbar {
                    width: 3px;
                    background-color: #f5f5f5;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 30px;
                    background-color: #8997bb;
                }
                .delevery-target-product-box {
                    display: flex;
                    position: relative;
                    padding: 25px 0px;
                    border-bottom: 1px dashed #d0d5dd;
                    &:last-child {
                        border: none;
                        padding-bottom: 0px;
                    }
                    .delevery-target-img {
                        width: 56px;
                        height: 56px;
                        border-radius: 16px;
                        border: 1px solid #d0d5dd;
                        padding: 8px;
                        position: absolute;
                        left: 0px;
                        top: 20px;
                        .delevery-target-img-inner {
                            background-color: #f8f8f8;
                            padding: 2px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }
                    }
                    .product-img-text {
                        width: 100%;
                        padding-left: 66px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .product-img-text-left {
                            h3 {
                                font-size: 18px;
                                color: #000;
                                padding-bottom: 5px;
                                font-weight: 500;
                            }
                            p {
                                color: #667085;
                                font-size: 12px;
                                line-height: 14px;
                            }
                        }
                        .product-img-text-right {
                            p {
                                border-radius: 8px;
                                border: 1px solid #d0d5dd;
                                width: 36px;
                                height: 34px;
                                font-size: 16px;
                                font-weight: 500;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                    }
                }
            }
        }
        .delevery-two-block {
            display: flex;
            margin: 0px -6px;
            .delevery-two-block-flex {
                width: 50%;
                padding: 0px 6px;
                .delevery-two-block-border {
                    border-radius: 16px;
                    border: 1px solid #d0d5dd;
                    padding: 16px;
                    background-color: #fcfcfd;
                    height: 100%;
                    h2 {
                        font-size: 18px;
                        line-height: 22px;
                        font-weight: 600;
                        color: #000;
                        text-align: center;
                        margin-bottom: 12px;
                    }
                    p {
                        color: #667085;
                        font-size: 12px;
                        line-height: 18px;
                    }
                }
                .delevery-two-block-upload {
                    .file-input {
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
                            flex-direction: column;
                            height: 230px;
                            border: 1px dashed #3538cd;
                            border-radius: 12px;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            background-color: #eef4ff;
                            padding: 10px;
                            p {
                                margin-top: 8px;
                                color: #000;
                                display: block;
                                font-weight: 500;
                                font-size: 12px;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
        .bottom-bar-target {
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            background-color: #fff;
            border-radius: 12px 12px 0px 0px;
            box-shadow: 10px 0px 40px 0px rgba(0, 0, 0, 0.15);
            padding: 15px;
            border: 1px solid #d0d5dd;
            display: flex;
            gap: 5px;
            .error-block {
                background-color: #fffbfa;
                display: flex;
                align-items: center;
                border-radius: 12px;
                cursor: pointer;
                padding: 10px 12px;
                width: 30%;
                border: 1px solid #d0d5dd;
                span {
                    padding-left: 8px;
                    color: #d92d20;
                    font-size: 18px;
                    font-weight: 600;
                }
            }
            .btn-target {
                width: 70%;
                button {
                    background-color: #f9c93c;
                    border-radius: 12px;
                    padding: 12px;
                    justify-content: center;
                    outline: none;
                    box-shadow: none;
                    font-size: 18px;
                    color: #fff;
                    font-family: "Public Sans", sans-serif;
                    font-weight: 500;
                    width: 100%;
                }
            }
        }
    }
    .map-block-location {
        height: 100vh;
        position: relative;
        .map-block-location-bottom {
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            background-color: #fff;
            border-radius: 18px 18px 0px 0px;
            box-shadow: 10px 0px 40px 0px rgba(0, 0, 0, 0.15);
            padding: 32px 15px;
            
            .bottom-bar-target-top {
                border-radius: 8px;
                border: 1px solid #d0d5dd;
                padding: 12px;
                margin-bottom: 15px;
                p {
                    border-radius: 8px;
                    border: 1px solid #d0d5dd;
                    padding: 12px;
                    font-size: 12px;
                    line-height: 16px;
                    color: #000;
                    margin-bottom: 8px;
                }
                .bottom-bar-block {
                    display: flex;
                    align-items: center;
                    h4 {
                        color: #667085;
                        font-size: 12px;
                        line-height: 16px;
                        font-weight: 500;
                        padding-left: 8px;
                    }
                }
            }
            .bottom-bar-target {
                display: flex;
                gap: 5px;
                .error-block {
                    background-color: #fffbfa;
                    display: flex;
                    align-items: center;
                    border-radius: 12px;
                    cursor: pointer;
                    padding: 10px 12px;
                    width: 30%;
                    border: 1px solid #d0d5dd;
                    span {
                        padding-left: 8px;
                        color: #d92d20;
                        font-size: 18px;
                        font-weight: 600;
                    }
                }
                .btn-target {
                    width: 70%;
                    button {
                        background-color: #f9c93c;
                        border-radius: 12px;
                        padding: 12px;
                        justify-content: center;
                        outline: none;
                        box-shadow: none;
                        font-size: 18px;
                        color: #fff;
                        font-family: "Public Sans", sans-serif;
                        font-weight: 500;
                        width: 100%;
                    }
                }
            }
        }
    }
`;

export default CommonBlock;
