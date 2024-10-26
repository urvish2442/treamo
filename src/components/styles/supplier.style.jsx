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
                }
            }
        }
        .dashboard-block-main {
            padding: 32px;
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
                    }
                }
            }
        }
        .dasborad-main {
            position: relative;
            .tabs-block {
                .react-tabs {
                    .react-tabs__tab-list {
                        margin: 0px 32px;
                        padding: 16px 0px;
                        border-bottom: 1px solid rgba(208, 213, 221, 0.6);
                        .react-tabs__tab {
                            border: none;
                            padding: 0px;
                            .tabs-block-link {
                                display: flex;
                                align-items: center;
                                padding: 8px 16px;
                                p {
                                    color: #98a2b3;
                                    font-size: 14px;
                                    padding-left: 8px;
                                }
                            }
                            &.react-tabs__tab--selected {
                                .tabs-block-link {
                                    border-bottom: 1px solid #ffc93c;
                                    svg {
                                        path {
                                            stroke: #ffc93c;
                                        }
                                    }
                                    p {
                                        color: #ffc93c;
                                    }
                                }
                            }
                        }
                    }
                }

                .tab-panel-block {
                    .tab-panel-block-inner {
                        .tab-button {
                            padding: 12px 32px 16px 32px;
                            border-bottom: 1px solid rgba(208, 213, 221, 0.6);
                            button {
                                padding: 12px 16px;
                                font-size: 12px;
                                line-height: 14px;
                                color: #98a2b3;
                                border: none;
                                font-weight: 400;
                                border-radius: 24px;
                                transition: 0.5s;
                                &:hover,
                                &.active-btn {
                                    background-color: rgba(249, 201, 60, 0.15);
                                    color: #ffc93c;
                                    font-weight: 600;
                                }
                            }
                        }
                        .tab-panel-custom {
                            padding: 12px 32px;
                        }
                        .tab-panel-data-block {
                            display: flex;
                            flex-wrap: wrap;
                            margin: 0px -12px;
                            .tab-panel-data-block-main {
                                width: 20%;
                                position: relative;
                                padding: 0px 12px 24px;
                                .tab-panel-data-block-inner {
                                    background-color: #ffffff;
                                    box-shadow: 0px 3px 6px
                                        rgba(148, 163, 184, 0.3);
                                    border-radius: 12px;
                                    &.height-tab-panel {
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        .block-img-tab {
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            img {
                                                width: 100px;
                                            }
                                        }
                                    }
                                    border: 1px solid #d0d5dd;
                                    .block-img-tab {
                                        width: 100%;
                                        height: 266px;
                                        position: relative;
                                        > img {
                                            width: 100%;
                                            height: 100%;
                                            object-fit: contain;
                                        }
                                        .plus-icon {
                                            position: absolute;
                                            bottom: 12px;
                                            right: 12px;
                                            a,
                                            button {
                                                width: 52px;
                                                height: 52px;
                                                border-radius: 8px;
                                                background-color: #ffffff;
                                                box-shadow: 0px 3px 6px
                                                    rgba(148, 163, 184, 0.3);
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                border: 1px solid #d0d5dd;
                                            }
                                        }
                                    }
                                    .block-content {
                                        padding: 24px 12px 0px 12px;
                                        display: flex;
                                        align-items: center;
                                        .block-content-left {
                                            border-radius: 8px;
                                            padding: 7px 8px;
                                            border: 1px solid #d0d5dd;
                                            display: flex;
                                            background-color: #f6fef9;
                                            align-items: center;
                                            margin-right: 12px;
                                            h3 {
                                                font-size: 24px;
                                                line-height: 26px;
                                                font-weight: 600;
                                                color: #027a48;
                                                &:last-child {
                                                    font-weight: 400;
                                                    font-size: 10px;
                                                    line-height: 10px;
                                                    text-transform: uppercase;
                                                    padding-left: 5px;
                                                }
                                            }
                                        }
                                        .block-content-right {
                                            display: flex;
                                            align-items: center;
                                            h5 {
                                                color: #667085;
                                                font-weight: 600;
                                                font-size: 14px;
                                            }
                                            h6 {
                                                color: #667085;
                                                padding-left: 2px;
                                                font-size: 8px;
                                                line-height: 8px;
                                                font-weight: 400;
                                                text-transform: uppercase;
                                            }
                                        }
                                    }
                                    .bottom-content {
                                        padding: 12px 12px 24px 12px;
                                        h3 {
                                            font-size: 16px;
                                            line-height: 20px;
                                            color: #000;
                                            font-weight: 700;
                                            margin-bottom: 5px;
                                        }
                                        p {
                                            color: #667085;
                                            font-size: 12px;
                                            line-height: 14px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .plus-icon {
                position: absolute;
                bottom: 160px;
                right: 20px;

                .add-icon-button {
                    width: 52px;
                    height: 52px;
                    border-radius: 8px;
                    background-color: #fff;
                    border: 1px solid rgba(208, 213, 221, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow:
                        0px 1px 3px rgba(16, 24, 40, 0.1),
                        0px 1px 2px rgba(16, 24, 40, 0.06);
                }
            }
        }
        .product-edit-block {
            padding: 32px;
            position: relative;
            display: flex;
            margin: 0px -15px;
            .product-edit-block-inner {
                width: 60%;
                padding: 0px 15px;
                .product-edit-block-inner-border {
                    padding: 32px 20px;
                    border: 1px solid #d0d5dd;
                    border-radius: 12px;
                    margin-bottom: 12px;
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
                    .border-label-title-block {
                        padding-bottom: 24px;
                        border-bottom: 1px solid #d0d5dd;
                        &.bottom-block {
                            border-bottom: none;
                            padding-top: 24px;
                            padding-bottom: 0px;
                            .top-block-edit-title {
                                .title-label-block {
                                    h3 {
                                        width: 100%;
                                    }
                                }
                                .input-remove-block {
                                    .input-remove-block-form {
                                        width: 100%;
                                    }
                                }
                            }
                        }
                    }
                    .top-block-edit-title {
                        margin: 0px 0px 24px;
                        .title-label-block {
                            display: flex;
                            align-items: center;
                            margin: 0px -5px 0px;
                            padding-right: 50px;
                            h3 {
                                display: flex;
                                align-items: center;
                                margin-bottom: 12px;
                                font-size: 16px;
                                color: #000;
                                font-weight: 500;
                                width: 80%;
                                padding: 0px 5px;
                                span {
                                    padding-left: 12px;
                                }
                                &:last-child {
                                    width: 20%;
                                }
                            }
                        }
                        .input-remove-block {
                            display: flex;
                            align-items: center;
                            margin: 0px -5px 0px;
                            padding-right: 50px;
                            position: relative;
                            .input-remove-block-form {
                                padding: 0px 5px;
                                width: 80%;
                                input {
                                    border: 1px solid rgba(208, 213, 221, 0.6);
                                    border-radius: 8px;
                                    box-shadow:
                                        0px 1px 3px rgba(16, 24, 40, 0.1),
                                        0px 1px 2px rgba(16, 24, 40, 0.06);
                                    width: 100%;
                                    padding: 12px;
                                    font-size: 16px;
                                    outline: none;
                                    height: 56px;
                                    &::placeholder {
                                        color: #64748b;
                                    }
                                    &::-ms-input-placeholder {
                                        color: #64748b;
                                    }
                                }
                                &:nth-child(2) {
                                    width: 20%;
                                }
                            }
                            .remove-block-delete {
                                position: absolute;
                                right: 0px;
                                top: 7px;
                                span {
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    background-color: #f04438;
                                    padding: 5px;
                                    svg {
                                        path {
                                            fill: #fff;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .top-block-edit {
                        display: flex;
                        align-items: center;
                        margin: 0px -5px 24px;
                        &.top-block-edit-inner {
                            margin-bottom: 0px;
                        }

                        h2 {
                            display: flex;
                            align-items: center;
                            margin-bottom: 24px;
                            font-size: 22px;
                            color: #000;
                            font-weight: 500;
                            span {
                                padding-left: 12px;
                            }
                        }
                        .top-block-edit-inner {
                            width: 90%;
                            padding: 0px 5px;
                            h3 {
                                display: flex;
                                align-items: center;
                                margin-bottom: 12px;
                                font-size: 16px;
                                color: #000;
                                font-weight: 500;
                                span {
                                    padding-left: 12px;
                                }
                            }
                            input {
                                border: 1px solid rgba(208, 213, 221, 0.6);
                                border-radius: 8px;
                                box-shadow:
                                    0px 1px 3px rgba(16, 24, 40, 0.1),
                                    0px 1px 2px rgba(16, 24, 40, 0.06);
                                width: 100%;
                                padding: 12px;
                                font-size: 16px;
                                outline: none;
                                height: 56px;
                                &::placeholder {
                                    color: #64748b;
                                }

                                &::-ms-input-placeholder {
                                    color: #64748b;
                                }
                            }
                        }
                        .top-block-edit-inner-block {
                            width: 10%;
                            padding: 0px 5px;
                            h3 {
                                display: flex;
                                align-items: center;
                                margin-bottom: 12px;
                                font-size: 16px;
                                color: #000;
                                font-weight: 500;
                            }
                            .input-chf {
                                height: 56px;
                                border: 1px solid rgba(208, 213, 221, 0.6);
                                border-radius: 8px;
                                box-shadow:
                                    0px 1px 3px rgba(16, 24, 40, 0.1),
                                    0px 1px 2px rgba(16, 24, 40, 0.06);
                                padding: 12px;
                                display: flex;
                                align-items: center;
                                input {
                                    border: none;
                                    outline: none;
                                    background: none;
                                    width: auto;
                                    width: 55px;
                                    font-size: 16px;
                                    color: #64748b;
                                    &::placeholder {
                                        color: #64748b;
                                    }

                                    &::-ms-input-placeholder {
                                        color: #64748b;
                                    }
                                }
                                span {
                                    font-size: 10px;
                                    font-weight: 400;
                                    color: #98a2b3;
                                }
                            }
                        }
                    }
                    .bottom-edit-block {
                        h3 {
                            display: flex;
                            align-items: center;
                            margin-bottom: 30px;
                            font-size: 16px;
                            color: #667085;
                            font-weight: 500;
                            span {
                                padding-left: 12px;
                            }
                        }
                        .two-block {
                            display: flex;
                            margin: 0px -5px;
                            .input-block {
                                width: 50%;
                                padding: 0px 5px;
                                label {
                                    font-size: 16px;
                                    color: #000;
                                    display: block;
                                    font-weight: 500;
                                    margin-bottom: 12px;
                                }
                                input {
                                    border: 1px solid rgba(208, 213, 221, 0.6);
                                    border-radius: 8px;
                                    box-shadow:
                                        0px 1px 3px rgba(16, 24, 40, 0.1),
                                        0px 1px 2px rgba(16, 24, 40, 0.06);
                                    width: 100%;
                                    padding: 12px;
                                    font-size: 16px;
                                    outline: none;
                                    height: 56px;
                                    &::placeholder {
                                        color: #64748b;
                                    }

                                    &::-ms-input-placeholder {
                                        color: #64748b;
                                    }
                                }
                            }
                            .select-form-block {
                                width: 50%;
                                padding: 0px 5px;
                                label {
                                    font-size: 16px;
                                    color: #000;
                                    font-weight: 500;
                                    display: block;
                                    margin-bottom: 12px;
                                }
                                .select-block-fetishes {
                                    height: 58px;
                                    margin-bottom: 12px;
                                    .react-select__control {
                                        height: 58px;
                                        border: 1px solid
                                            rgba(208, 213, 221, 0.6);
                                        border-radius: 8px;
                                        box-shadow:
                                            0px 1px 3px rgba(16, 24, 40, 0.1),
                                            0px 1px 2px rgba(16, 24, 40, 0.06);
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
                        }
                    }
                    .edit-block-input {
                        .textarea-block {
                            padding-bottom: 24px;
                            border-bottom: 1px solid #d0d5dd;
                            margin-bottom: 24px;
                            textarea {
                                width: 100%;
                                height: 119px;
                                border-radius: 8px;
                                border: 1px solid #d0d5dd;
                                padding: 20px 12px;
                                font-size: 12px;
                                color: #98a2b3;
                                outline: none;
                                &::placeholder {
                                    color: #98a2b3;
                                }

                                &::-ms-input-placeholder {
                                    color: #98a2b3;
                                }
                            }
                        }
                    }
                    .edit-block-table {
                        margin-top: 24px;
                        padding-top: 24px;
                        border-top: 1px solid #d0d5dd;
                        .edit-block-table-inner {
                            border: 1px solid #d0d5dd;
                            border-radius: 8px;
                            overflow: hidden;
                            .edit-block-table-inner-top {
                                background-color: #f9fafb;
                                padding: 12px;
                                h3 {
                                    font-size: 12px;
                                    line-height: 16px;
                                    color: #667085;
                                    font-weight: 500;
                                    text-align: center;
                                }
                                .edit-block-table-inner-title {
                                    padding: 10px 0px 0px;
                                    display: flex;
                                    h5 {
                                        font-size: 12px;
                                        line-height: 16px;
                                        color: #667085;
                                        font-weight: 500;
                                        text-align: center;
                                        width: 30%;
                                        display: flex;
                                        align-items: flex-start;
                                        &:last-child {
                                            width: 70%;
                                            padding-left: 10px;
                                        }
                                    }
                                }
                            }
                            .edit-block-table-inner-title-main {
                                .edit-block-table-inner-title-data {
                                    padding: 15px 10px;
                                    border-top: 1px solid #d0d5dd;
                                    display: flex;
                                    margin: 0px -15px;
                                    .edit-block-table-td {
                                        width: 30%;
                                        padding: 0px 15px;
                                        &:last-child {
                                            width: 70%;
                                        }
                                        .edit-block-table-td-inner {
                                            padding: 8px 12px;
                                            border: 1px solid #d0d5dd;
                                            border-radius: 8px;
                                            background-color: #f9fafb;
                                            p {
                                                color: #000;
                                                font-weight: 500;
                                                font-size: 12px;
                                                line-height: 14px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .product-edit-block-inner-left {
                width: 40%;
                padding: 0px 15px;
                .product-edit-block-inner-left-inner {
                    padding: 32px 20px;
                    border: 1px solid #d0d5dd;
                    border-radius: 12px;

                    .product-edit-input {
                        margin-bottom: 24px;
                        label {
                            font-size: 16px;
                            color: #000;
                            font-weight: 500;
                            display: block;
                            margin-bottom: 12px;
                        }
                        .select-block-fetishes {
                            height: 58px;
                            margin-bottom: 12px;
                            .react-select__control {
                                height: 58px;
                                border: 1px solid rgba(208, 213, 221, 0.6);
                                border-radius: 8px;
                                box-shadow:
                                    0px 1px 3px rgba(16, 24, 40, 0.1),
                                    0px 1px 2px rgba(16, 24, 40, 0.06);
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
                        input {
                            border: 1px solid rgba(208, 213, 221, 0.6);
                            border-radius: 8px;
                            box-shadow:
                                0px 1px 3px rgba(16, 24, 40, 0.1),
                                0px 1px 2px rgba(16, 24, 40, 0.06);
                            width: 100%;
                            padding: 12px;
                            font-size: 16px;
                            outline: none;
                            height: 56px;
                            &::placeholder {
                                color: #64748b;
                            }

                            &::-ms-input-placeholder {
                                color: #64748b;
                            }
                        }
                    }
                    .two-block-group {
                        display: flex;
                        align-items: center;
                        margin: 0px -5px 24px;
                        label {
                            font-size: 16px;
                            color: #000;
                            font-weight: 500;
                            display: block;
                            margin-bottom: 12px;
                        }
                        .two-block-group-left {
                            width: 50%;
                            padding: 0px 5px;
                            .select-block-fetishes {
                                height: 58px;
                                margin-bottom: 12px;
                                .react-select__control {
                                    height: 58px;
                                    border: 1px solid rgba(208, 213, 221, 0.6);
                                    border-radius: 8px;
                                    box-shadow:
                                        0px 1px 3px rgba(16, 24, 40, 0.1),
                                        0px 1px 2px rgba(16, 24, 40, 0.06);
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
                    }
                    .checkbox-custom {
                        .form-group {
                            position: relative;
                            margin-bottom: 24px;
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
                    .checkbox-custom-four {
                        display: flex;
                        margin: 0px -5px 24px;
                        .product-edit-input {
                            width: 25%;
                            padding: 0px 5px;
                            input {
                                border: 1px solid rgba(208, 213, 221, 0.6);
                                border-radius: 8px;
                                box-shadow:
                                    0px 1px 3px rgba(16, 24, 40, 0.1),
                                    0px 1px 2px rgba(16, 24, 40, 0.06);
                                width: 100%;
                                padding: 12px;
                                font-size: 16px;
                                outline: none;
                                height: 56px;
                                &::placeholder {
                                    color: #64748b;
                                }

                                &::-ms-input-placeholder {
                                    color: #64748b;
                                }
                            }
                        }
                    }
                    .two-block-group {
                        display: flex;
                        margin: 0px -5px 0px;
                        .two-block-group-left {
                            width: 50%;
                            padding: 0px 5px;
                            input {
                                border: 1px solid rgba(208, 213, 221, 0.6);
                                border-radius: 8px;
                                box-shadow:
                                    0px 1px 3px rgba(16, 24, 40, 0.1),
                                    0px 1px 2px rgba(16, 24, 40, 0.06);
                                width: 100%;
                                padding: 12px;
                                font-size: 16px;
                                outline: none;
                                height: 56px;
                                &::placeholder {
                                    color: #64748b;
                                }

                                &::-ms-input-placeholder {
                                    color: #64748b;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default CommonPageBLockHub;
