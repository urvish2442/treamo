import { createSlice } from "@reduxjs/toolkit";

const initialState = { shiftHubId: "", shiftTime: "", activeOrDeliver: false };

const ShiftReducer = createSlice({
    name: "ShiftReducer",
    initialState,
    reducers: {
        resetToInitialState(state) {
            return initialState;
        },
        setShiftHubId: (state, action) => {
            state.shiftHubId = action.payload;
        },
        setShiftTime: (state, action) => {
            state.shiftTime = action.payload;
        },
        setShiftTime: (state, action) => {
            state.shiftTime = action.payload;
        },
        setActiveOrDeliver: (state, action) => {
            state.activeOrDeliver = action.payload;
        },
    },
});

export const {
    setShiftHubId,
    setShiftTime,
    setActiveOrDeliver,
    resetToInitialState,
} = ShiftReducer.actions;

export const shiftDataSliceReducer = ShiftReducer.reducer;
