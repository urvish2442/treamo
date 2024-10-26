// components/Button.js
import styled from "styled-components";
const CommonPageBLockHub = styled.div`
    .common-block-hub {
        position: relative;
        .common-block-hub-menu {
            padding: 16px 32px;
            border-bottom: 1px solid rgba(208, 213, 221, 0.6);
            ul {
                display: flex;
                align-items: center;
                li {
                    margin-right: 12px;
                    a {
                        color: #98a2b3;
                        font-size: 14px;
                        border: 1px solid transparent;
                        border-radius: 8px;
                        padding: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 160px;
                        &.active-link {
                            box-shadow:
                                0px 1px 3px rgba(16, 24, 40, 0.1),
                                0px 1px 2px rgba(16, 24, 40, 0.06);
                            border: 1px solid rgba(208, 213, 221, 0.6);
                            color: #f9c93c;
                        }
                    }
                    .select-form-block {
                        .select-block-fetishes {
                            height: 48px;
                            margin-bottom: 0px;
                            .react-select__control {
                                height: 48px;
                                box-shadow:
                                    0px 1px 3px rgba(16, 24, 40, 0.1),
                                    0px 1px 2px rgba(16, 24, 40, 0.06);
                                border: 1px solid rgba(208, 213, 221, 0.6);
                                border-radius: 8px;
                                width: 150px;
                                .react-select__placeholder {
                                    color: #98a2b3;
                                    line-height: 14px;
                                    font-size: 14px;
                                }
                                .react-select__input-container {
                                    color: #98a2b3;
                                    font-size: 12px;
                                    line-height: 12px;
                                }
                                .react-select__input {
                                    color: #98a2b3;
                                    font-size: 12px;
                                    line-height: 12px;
                                    &::placeholder {
                                        color: #64748b;
                                    }

                                    &::-ms-input-placeholder {
                                        color: #64748b;
                                    }
                                }
                            }
                            .react-select__indicators {
                                .react-select__indicator-separator {
                                    display: none;
                                }
                                .react-select__indicator {
                                    svg {
                                        path {
                                            fill: #98a2b3;
                                        }
                                    }
                                }
                            }
                        }
                        .react-select__menu {
                            /* border: 1px solid #d0d5dd; */
                            border-radius: 8px;
                            padding: 0px;
                            .react-select__menu-list {
                                padding: 0px;
                                overflow: hidden;
                                border-radius: 8px;
                            }
                            .react-select__option {
                                color: #000;
                                font-size: 12px;
                                line-height: 12px;
                                &.react-select__option--is-focused {
                                    background-color: #f9c93c;
                                }
                            }
                        }
                    }
                }
            }
        }
        .dashboard-block-main {
            padding: 52px 32px 52px 235px;
            .dashboard-block-main-inner {
                display: flex;
                margin: 0px -15px;
                .dashboard-block-main-inner-block {
                    width: 50%;
                    padding: 0px 15px;
                    .block-border {
                        border: 1px solid #d0d5dd;
                        border-radius: 24px;
                        padding: 32px;
                        min-height: 350px;
                    }
                }
            }
        }
        .edit-profile-block {
            padding: 32px;
            position: relative;
            .edit-profile-block-three {
                margin: 0px -16px;
                display: flex;
                .edit-profile-block-three-block {
                    width: 35%;
                    padding: 0px 15px 15px;
                    &:last-child {
                        width: 30%;
                    }
                    .edit-profile-block-three-block-inner {
                        padding: 32px 12px 65px 12px;
                        border-radius: 12px;
                        border: 1px solid #d0d5dd;
                        .top-edit-profile-block {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-bottom: 25px;

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
                                        display: flex;
                                        align-items: center;
                                        height: 58px;
                                        border-radius: 12px;
                                        border: 1px solid #d0d5dd;
                                        padding: 12px;
                                        position: relative;
                                        .text-red-500 {
                                            font-size: 10px;
                                            line-height: 10px;
                                            position: absolute;
                                            bottom: -11px;
                                            left: 0px;
                                        }
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
                                            padding: 0px;
                                            &::placeholder {
                                                color: #000;
                                                opacity: 1; /* Firefox */
                                            }

                                            &::-ms-input-placeholder {
                                                /* Edge 12 -18 */
                                                color: #000;
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
                                position: relative;
                                .text-red-500 {
                                    font-size: 10px;
                                    line-height: 10px;
                                    position: absolute;
                                    bottom: 2px;
                                    left: 5px;
                                }
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
                    }
                }
            }
        }
        .rider-block {
            position: relative;
            padding: 32px;
            .rider-block-three {
                display: flex;
                margin: 0px -16px;
                &.order-checklist-block {
                    .rider-block-three-block {
                        width: 25%;
                        .rider-block-three-block-inner {
                            .add-btn {
                                .check-order {
                                    border: 1px solid #d0d5dd;
                                    background: transparent;
                                    span {
                                        color: #027a48;
                                    }
                                }
                            }
                            .rider-block-data {
                                .rider-block-data-inner {
                                    .rider-block-data-inner-block {
                                        display: flex;
                                        justify-content: space-between;
                                        .rider-block-checkbox {
                                            display: flex;
                                            align-items: center;
                                            width: 70%;
                                        }
                                        .checkbox-custom {
                                            width: 30%;
                                            display: flex;
                                            align-items: flex-end;
                                            justify-content: flex-end;
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
                                                    cursor: pointer;
                                                    &::before {
                                                        content: "";
                                                        -webkit-appearance: none;
                                                        background-color: transparent;
                                                        border: 1px solid
                                                            #94a3b8;
                                                        width: 16px;
                                                        height: 16px;
                                                        display: inline-block;
                                                        position: relative;
                                                        vertical-align: middle;
                                                        cursor: pointer;
                                                        border-radius: 50%;
                                                    }
                                                }
                                            }
                                            .form-group
                                                input:checked
                                                + label:after {
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
                                            .form-group
                                                input:checked
                                                + label:before {
                                                background-color: #f9c93c;
                                                border-color: #f9c93c;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .rider-block-three-block {
                    width: 33.33%;
                    padding: 0px 16px;
                    .rider-block-three-block-inner {
                        padding: 24px;
                        border-radius: 12px;
                        border: 1px solid #d0d5dd;
                        .rider-block-top {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 12px;
                            &.no-title {
                                justify-content: flex-end;
                            }
                            h2 {
                                color: #000;
                                font-weight: 500;
                                font-size: 22px;
                                line-height: 26px;
                            }
                            .label-group {
                                display: flex;
                                .recommened {
                                    margin-right: 8px;
                                    padding: 8px 12px;
                                    border-radius: 8px;
                                    border: 1px solid #d0d5dd;
                                    color: #027a48;
                                    background-color: #f6fef9;
                                    font-size: 14px;
                                    font-weight: 400;
                                }
                                .max-block {
                                    padding: 8px 12px;
                                    border-radius: 8px;
                                    border: 1px solid #d0d5dd;
                                    color: #667085;
                                    font-size: 14px;
                                    font-weight: 400;
                                }
                            }
                        }
                        .shift-block {
                            padding: 12px 8px;
                            border-radius: 8px;
                            border: 1px solid #d0d5dd;
                            margin-bottom: 16px;
                            p {
                                color: #b42318;
                                font-weight: 500;
                                font-size: 14px;
                            }
                        }
                    }
                    .rider-block-data {
                        height: 195px;
                        overflow-y: auto;
                        margin-bottom: 18px;
                        .rider-block-data-inner-block {
                            display: flex;
                            align-items: center;
                            padding: 15px 8px;
                            border-radius: 8px;
                            border: 1px solid #d0d5dd;
                            margin-bottom: 8px;
                            > img {
                                width: 24px;
                                height: 24px;
                                border-radius: 50%;
                                object-fit: cover;
                            }
                            h4 {
                                font-weight: 500;
                                font-size: 14px;
                                color: #607085;
                                padding-left: 8px;
                            }
                        }
                    }
                    .add-btn {
                        .btn-add {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 12px;
                            background-color: #eef4ff;
                            border-radius: 30px;
                            width: 100%;
                            border: 1px dashed #3538cd;
                            span {
                                font-size: 14px;
                                color: #000;
                                padding-left: 10px;
                            }
                        }
                    }
                }
            }
        }
        .schedule-block {
            padding: 32px;
            position: relative;
            .schedule-block-four {
                display: flex;
                margin: 0px -16px;
                .schedule-block-four-inner {
                    width: 25%;
                    padding: 0px 16px;
                    .schedule-block-four-inner-block {
                        .schedule-block-common {
                            padding: 16px;
                            border-radius: 12px;
                            border: 1px solid #d0d5dd;
                            margin-bottom: 24px;
                            .top-block {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                margin-bottom: 12px;
                                h2 {
                                    color: #000;
                                    font-size: 18px;
                                    line-height: 20px;
                                    font-weight: 500;
                                }
                                .active-block {
                                    border-radius: 8px;
                                    padding: 8px 12px;
                                    border: 1px solid #039855;
                                    font-size: 12px;
                                    color: #039855;
                                    background-color: #f6fef9;
                                }
                                .request-block {
                                    background-color: #fffcf5;
                                    border-radius: 8px;
                                    padding: 8px 12px;
                                    border: 1px solid #b54708;
                                    font-size: 12px;
                                    color: #b54708;
                                }
                                .complate-block {
                                    background-color: #f5ffff;
                                    border-radius: 8px;
                                    padding: 8px 12px;
                                    border: 1px solid #175cd3;
                                    font-size: 12px;
                                    color: #175cd3;
                                }
                            }
                            .input-block-inner {
                                input {
                                    border-radius: 8px;
                                    outline: none;
                                    box-shadow: none;
                                    color: #000;
                                    height: 50px;
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
                            .btn-conform {
                                margin-top: 24px;
                                button {
                                    border: 1px solid #d0d5dd;
                                    border-radius: 8px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    padding: 15px;
                                    color: #027a48;
                                    width: 100%;
                                    font-weight: 500;
                                    font-size: 14px;
                                    border-radius: 30px;
                                }
                            }
                            .shift-block-inner {
                                padding: 12px 8px;
                                border-radius: 12px;
                                border: 1px solid #d0d5dd;
                                display: flex;
                                align-items: center;
                                p {
                                    font-size: 12px;
                                    line-height: 16px;
                                    color: #667085;
                                    &.end-shift {
                                        color: #f04438;
                                    }
                                    &.block-tag {
                                        padding: 0px 8px;
                                    }
                                }
                            }
                            .schedule-block-common-checkbox {
                                margin-bottom: 24px;
                                .checkbox-block-inner {
                                    border-radius: 8px;
                                    border: 1px solid #d0d5dd;
                                    margin-bottom: 12px;
                                    padding: 14px 8px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;

                                    p {
                                        font-weight: 500;
                                        font-size: 14px;
                                        color: #607085;
                                        padding-left: 8px;
                                    }
                                    .checkbox-custom {
                                        width: 30%;
                                        display: flex;
                                        align-items: flex-end;
                                        justify-content: flex-end;
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
                                                    border-radius: 50%;
                                                }
                                            }
                                        }
                                        .form-group
                                            input:checked
                                            + label:after {
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
                                        .form-group
                                            input:checked
                                            + label:before {
                                            background-color: #f9c93c;
                                            border-color: #f9c93c;
                                        }
                                    }
                                }
                            }
                            .add-block-inner {
                                .add-btn {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    padding: 12px;
                                    border-radius: 30px;
                                    width: 100%;
                                    border: 1px solid #fda29b;
                                    font-size: 14px;
                                    color: #f04438;
                                }
                            }
                        }
                        .add-btn-block {
                            button {
                                border: 1px solid rgba(208, 213, 221, 0.6);
                                border-radius: 8px;
                                box-shadow:
                                    0px 1px 3px rgba(16, 24, 40, 0.1),
                                    0px 1px 2px rgba(16, 24, 40, 0.06);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                padding: 15px;
                                width: 100%;
                                border-radius: 30px;
                                span {
                                    padding-left: 10px;
                                    color: #000;
                                    font-weight: 500;
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .common-calender-page {
            position: relative;
            padding: 32px;
            .rdp-root {
                .rdp-months {
                    display: flex;
                    width: 100%;
                    max-width: 100%;
                    flex-wrap: nowrap;
                    .rdp-nav {
                        display: none;
                    }
                    .rdp-month {
                        padding: 32px;
                        border: 1px solid #d0d5dd;
                        border-radius: 12px;
                        width: 33.33%;
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
                                    }
                                }
                            }
                            tbody {
                                .rdp-week {
                                    .rdp-day {
                                        border-radius: 24px;
                                        color: #000;
                                        position: relative;
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
        }
        .label-block-close {
            padding: 0px 32px 32px;
            position: relative;
            .label-block-close-block {
                padding: 32px;
                border: 1px solid #d0d5dd;
                border-radius: 12px;
                .label-block-close-inner {
                    margin-bottom: 12px;
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
                    &.open-block {
                        background-color: #f6fef9;
                        span {
                            background-color: #027a48;
                        }
                        h3 {
                            color: #027a48;
                        }
                    }
                }
            }
        }
    }
`;

export default CommonPageBLockHub;
