import { createSlice } from "@reduxjs/toolkit";
import {
    getFundServiceAction,
    createPaymentServiceAction,
    chargeUserServiceAction,
    listPaymentServiceAction,
    createRefundServiceAction,
    getTransactionServiceAction,
    getAutoTopupServiceAction,
    createUpdateAutoTopupAction,
} from "./action";

const initialState = {
    isLoading: false,
    data: [],
    notification: {},
};

const PaymentSlice = createSlice({
    name: "PaymentSlice",
    initialState,
    reducers: {
        resetToInitialState(state) {
            return initialState;
        },
        // setAppointmentData: (state, action) => {
        //   state.data = action.payload;
        // },
        // setNotificationData: (state, action) => {
        //   state.notification = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            // getFundServiceAction
            .addCase(getFundServiceAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getFundServiceAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getFundServiceAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            //   createPaymentServiceAction
            .addCase(
                createPaymentServiceAction.pending,
                (state, { payload }) => {
                    state.isLoading = true;
                    state.error = null;
                },
            )
            .addCase(
                createPaymentServiceAction.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = null;
                },
            )
            .addCase(
                createPaymentServiceAction.rejected,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                },
            )
            //   chargeUserServiceAction
            .addCase(chargeUserServiceAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                chargeUserServiceAction.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = null;
                },
            )
            .addCase(chargeUserServiceAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            //   listPaymentServiceAction
            .addCase(listPaymentServiceAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                listPaymentServiceAction.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = null;
                },
            )
            .addCase(
                listPaymentServiceAction.rejected,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                },
            )
            //   createRefundServiceAction
            .addCase(
                createRefundServiceAction.pending,
                (state, { payload }) => {
                    state.isLoading = true;
                    state.error = null;
                },
            )
            .addCase(
                createRefundServiceAction.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = null;
                },
            )
            .addCase(
                createRefundServiceAction.rejected,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                },
            )
            //   getTransactionServiceAction
            .addCase(
                getTransactionServiceAction.pending,
                (state, { payload }) => {
                    state.isLoading = true;
                    state.error = null;
                },
            )
            .addCase(
                getTransactionServiceAction.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = null;
                },
            )
            .addCase(
                getTransactionServiceAction.rejected,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                },
            )
            //   getAutoTopupServiceAction
            .addCase(
                getAutoTopupServiceAction.pending,
                (state, { payload }) => {
                    state.isLoading = true;
                    state.error = null;
                },
            )
            .addCase(
                getAutoTopupServiceAction.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = null;
                },
            )
            .addCase(
                getAutoTopupServiceAction.rejected,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                },
            )
            //   createUpdateAutoTopupServiceAction
            .addCase(
                createUpdateAutoTopupAction.pending,
                (state, { payload }) => {
                    state.isLoading = true;
                    state.error = null;
                },
            )
            .addCase(
                createUpdateAutoTopupAction.fulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = null;
                },
            )
            .addCase(
                createUpdateAutoTopupAction.rejected,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                },
            );
    },
});

export const paymentApiSliceReducer = PaymentSlice.reducer;

export const { userStore, resetToInitialState } = PaymentSlice.actions;
