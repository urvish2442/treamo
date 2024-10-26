import { createSlice } from "@reduxjs/toolkit";

import {
    forgotPasswordAction,
    getCategoryListAction,
    GetHubListAction,
    getUserAction,
    loginAction,
    logoutAction,
    registerAction,
    resetPasswordAction,
} from "./action";
import { ORDER_STATUS } from "@/constants/keywords";

const initialState = {
    isLoading: false,
    isForgotPassword: false,
    isRestPassword: false,
    isEmailData: "",
    userData: {},
    isLoggedIn: false,
    hubData: [],
    categoryList: [],
    hubList: [],
    productDetail: {},
    categorySubCategory: {},
    date: "",
    orders: [],
    currentOrderIndex: 0,
    bag_id: [],
};

const AuthSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        resetToInitialState(state) {
            return initialState;
        },
        setUserData: (state, { payload }) => {
            state.userData = payload;
        },
        setProductDetails: (state, { payload }) => {
            state.productDetail = payload;
        },
        setCategorySubCategoryDetails: (state, { payload }) => {
            state.categorySubCategory = payload;
        },
        setHubData: (state, { payload }) => {
            state.hubData = payload;
        },
        setDate: (state, { payload }) => {
            state.date = payload;
        },
        setIsForgotPassword: (state, { payload }) => {
            state.isForgotPassword = payload;
        },
        setIsOtp: (state, { payload }) => {
            state.isOtp = payload.isOtp;
            state.isEmailData = payload.email;
        },
        setIsRestPassword: (state, { payload }) => {
            state.isRestPassword = payload.isResetPassword;
            state.isEmailData = payload.email;
        },
        setIsLoggedIn: (state, { payload }) => {
            state.isLoggedIn = payload;
        },
        setRiderDetail: (state, { payload }) => {
            state.riderDetail = payload;
        },
        setNextCurrentOrderIndex: (state) => {
            if (state.orders.length > 0) {
                state.currentOrderIndex =
                    (state.currentOrderIndex + 1) % state.orders.length;
            }
        },
        resetNextCurrentOrderIndex: (state, { payload }) => {
            state.currentOrderIndex = 0;
            state.pickedOrders = state.orders;
            state.orders = [];
        },
        setRouteDirection: (state, { payload }) => {
            state.orders = payload.updatedDirections;
        },

        updateOrderBagId: (state, { payload }) => {
            const { bag_id } = payload;
            const currentOrder = state.orders[state.currentOrderIndex];
            if (currentOrder) {
                state.bag_id.push(bag_id);
                if (Array.isArray(currentOrder.bag_id)) {
                    currentOrder.bag_id.push(bag_id);
                } else {
                    currentOrder.bag_id = [bag_id];
                }
            }
        },
        setOrderDetailsInOrders: (state, { payload }) => {
            const { orderDetails } = payload;
            const currentOrder = state.orders[state.currentOrderIndex];
            let isChecked = false;
            let isPicked = false;
            let isDelivered = false;
            let isSolveLater = false;
            let bag_id = [];
            if (
                orderDetails?.status === ORDER_STATUS.PICKED ||
                orderDetails?.ts_picked !== null
            ) {
                isChecked = true;
                isPicked = true;
            } else if (
                orderDetails?.status === ORDER_STATUS.DELIVERED ||
                orderDetails?.ts_delivered !== null
            ) {
                isChecked = true;
                isPicked = true;
                isDelivered = true;
            } else if (orderDetails?.status === ORDER_STATUS.REFUNDED) {
                isChecked = true;
                isPicked = true;
                isDelivered = true;
            } else if (orderDetails?.status === ORDER_STATUS.ORDERED) {
            }
            state.orders[state.currentOrderIndex] = {
                ...currentOrder,
                orderDetails,
                isChecked,
                isPicked,
                isDelivered,
                isSolveLater,
                bag_id,
            };
        },
        updateOrderStatus: (state, { payload }) => {
            const { statusKey, value } = payload;
            state.orders[state.currentOrderIndex][statusKey] = value;
            if (statusKey == "isPicked") {
                state.orders[state.currentOrderIndex].orderDetails.status =
                    ORDER_STATUS.PICKED;
                if (state.currentOrderIndex < state.orders.length - 1) {
                    state.currentOrderIndex = state.currentOrderIndex + 1;
                }
            }
        },

        updateOrderProductField: (state, { payload }) => {
            const { product_id, fieldKey, value, isDefault = true } = payload;
            const productIndex = state.orders[
                state.currentOrderIndex
            ].orderDetails.items.findIndex(
                (item) => item.product_id === product_id,
            );

            if (productIndex !== -1) {
                const item =
                    state.orders[state.currentOrderIndex].orderDetails.items[
                        productIndex
                    ];

                let updatedValue = value;

                if (fieldKey === "quantity_refunded") {
                    updatedValue += item.quantity_refunded;
                } else {
                    item[fieldKey] = updatedValue;
                }
                if (
                    fieldKey === "acceptedCount" &&
                    updatedValue === item.quantity - item.quantity_refunded &&
                    isDefault
                ) {
                    item.isDamaged = false;
                    item.isMissing = false;
                    state.orders[state.currentOrderIndex].isSolveLater = false;
                }
            }
        },
        shiftCurrentProductToLast: (state, { payload }) => {
            const { product_id } = payload;

            if (state.orders.length === 0) return;
            const tempItems = [
                ...state.orders[state.currentOrderIndex].orderDetails.items,
            ];
            const productIndex = tempItems.findIndex(
                (item) => item.product_id === product_id,
            );
            if (productIndex !== -1) {
                const [productToMove] = tempItems.splice(productIndex, 1);
                tempItems.push(productToMove);
                state.orders[state.currentOrderIndex].orderDetails.items =
                    tempItems;
            }
        },

        shiftCurrentOrderToLast: (state) => {
            if (state.orders.length === 0) return;
            const currentOrder = state.orders[state.currentOrderIndex];
            currentOrder.isSolveLater = true;
            const updatedOrders = [
                ...state.orders.slice(0, state.currentOrderIndex),
                ...state.orders.slice(state.currentOrderIndex + 1),
                currentOrder,
            ];
            state.orders = updatedOrders;
        },
    },

    extraReducers: (builder) => {
        builder
            // .addCase(registerAction.pending, (state, { payload }) => {
            //   state.isLoading = true;
            //   state.error = null;
            // })
            // .addCase(registerAction.fulfilled, (state, { payload }) => {
            //   state.isLoading = false;
            //   state.error = null;
            // })
            // .addCase(registerAction.rejected, (state, { payload }) => {
            //   state.isLoading = false;
            //   state.error = payload;
            // })
            .addCase(loginAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(loginAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getUserAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userData = payload?.data || {};
                state.error = null;
            })
            .addCase(getUserAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(logoutAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userData = {};
                state.error = null;
            })
            .addCase(logoutAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getCategoryListAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategoryListAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.categoryList = payload;
                state.error = null;
            })
            .addCase(getCategoryListAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(GetHubListAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(GetHubListAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.hubList = payload;
                state.error = null;
            })
            .addCase(GetHubListAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
        // .addCase(forgotPasswordAction.pending, (state, { payload }) => {
        //   state.isLoading = true;
        //   state.error = null;
        // })
        // .addCase(forgotPasswordAction.fulfilled, (state, { payload }) => {
        //   state.isLoading = false;
        //   state.error = null;
        // })
        // .addCase(forgotPasswordAction.rejected, (state, { payload }) => {
        //   state.isLoading = false;
        //   state.error = payload;
        // })
        // .addCase(resetPasswordAction.pending, (state, { payload }) => {
        //   state.isLoading = true;
        //   state.error = null;
        // })
        // .addCase(resetPasswordAction.fulfilled, (state, { payload }) => {
        //   state.isLoading = false;
        //   state.error = null;
        // })
        // .addCase(resetPasswordAction.rejected, (state, { payload }) => {
        //   state.isLoading = false;
        //   state.error = payload;
        // });
    },
});

export const authApiSliceReducer = AuthSlice.reducer;
export const authState = (state) => state.auth;
export const {
    setUserData,
    setHubData,
    resetToInitialState,
    setIsForgotPassword,
    setIsRestPassword,
    setIsLoggedIn,
    setProductDetails,
    setCategorySubCategoryDetails,
    setRiderDetail,
    setDate,
    setNextCurrentOrderIndex,
    resetNextCurrentOrderIndex,
    updateOrderBagId,
    setRouteDirection,
    setOrderDetailsInOrders,
    updateOrderStatus,
    updateOrderProductField,
    shiftCurrentProductToLast,
    shiftCurrentOrderToLast,
} = AuthSlice.actions;
