import {
    axiosDelete,
    axiosGet,
    axiosPatch,
    axiosPost,
    axiosPut,
} from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

export const GetDashBoardIframe = (payload) => {
    return axiosGet(API_ROUTER.GET_KNOWI_URL, payload);
};

export const GetHubManager = (id) => {
    return axiosGet(API_ROUTER.GET_HUBMANAGERS_BY_ID(id));
};

export const UpdateUserService = (payload) => {
    return axiosPatch(API_ROUTER.UPDATE_USER, payload);
};

export const UpdateHubManagerService = (payload) => {
    return axiosPatch(API_ROUTER.UPDATE_HUB_MANAGER, payload);
};

export const GetDaysForHubManager = (payload) => {
    return axiosGet(API_ROUTER.DAYS_LIST, payload);
};

export const GetShiftsService = (payload) => {
    return axiosGet(API_ROUTER.GET_SHIFTS, payload);
};

export const GetAvailabilitiesService = (payload) => {
    return axiosGet(API_ROUTER.GET_AVAILABILITIES, payload);
};

export const CreateShiftService = (payload) => {
    return axiosPost(API_ROUTER.CREATE_SHIFT, payload);
};

export const GetShiftByIdService = (payload) => {
    return axiosGet(API_ROUTER.GET_SHIFT_BY_ID(payload));
};

export const UpdateShiftByIdService = ({ id, data }) => {
    return axiosPut(API_ROUTER.UPDATE_SHIFT_BY_ID(id), data);
};
