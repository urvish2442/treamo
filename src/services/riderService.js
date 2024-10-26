import { API_ROUTER } from "./apiRouter";
import { axiosGet } from "./axiosHelper";

export const GetHubByIdService = (payload) => {
    return axiosGet(API_ROUTER.GET_HUB_BY_ID(payload));
};
export const GetToDoTaskService = (payload) => {
    return axiosGet(API_ROUTER.GET_TODO_TASK(payload));
};
export const GetShiftsList = (payload) => {
    return axiosGet(API_ROUTER.GET_SHIFTS, payload);
};
