import {
    axiosDelete,
    axiosGet,
    axiosPatch,
    axiosPost,
} from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

export const LoginUser = (data) => {
    return axiosPost(API_ROUTER.LOGIN_USER, data);
};

export const AuthToken = (data) => {
    return axiosPost(API_ROUTER.AUTH_TOKEN, data);
};

export const AuthLink = (data) => {
    return axiosGet(API_ROUTER.AUTH_LINK, data);
};

export const Logout = () => {
    return axiosDelete(API_ROUTER.AUTH_LOGOUT);
};

export const LogoutAll = () => {
    return axiosDelete(API_ROUTER.AUTH_LOGOUT_ALL);
};

export const GetUser = (data) => {
    return axiosGet(API_ROUTER.GET_ME, data);
};

export const CreateUser = (data) => {
    return axiosPost(API_ROUTER.CREATE_USER, data);
};

export const UpdateUser = (data) => {
    return axiosPatch(API_ROUTER.UPDATE_USER, data);
};

export const GetCategoryList = (data) => {
    return axiosGet(API_ROUTER.LIST_CATEGORIES, data);
};

export const GetHubList = (data) => {
    return axiosGet(API_ROUTER.HUB_LIST, data);
};

export const GetRiderDetail = (riderId) => {
    return axiosGet(API_ROUTER.GET_RIDER(riderId));
};
