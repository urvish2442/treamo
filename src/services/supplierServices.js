import {
    axiosDelete,
    axiosGet,
    axiosPatch,
    axiosPost,
} from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

export const GetProductsForSupplier = (payload) => {
    // return axiosGet(API_ROUTER.LIST_PRODUCTS_ME, payload);
    return axiosGet(API_ROUTER.GET_PRODUCTS, payload);
};

// export const GetProductDetailsForSupplier = (payload) => {
//     return axiosGet(API_ROUTER.GET_PRODUCT_BY_ID(payload));
// }

export const UpdateProductDetailsForSupplier = ({ id, data }) => {
    return axiosPatch(API_ROUTER.UPDATE_PRODUCT_BY_ID(id), data);
};

export const AddProductForSupplier = (data) => {
    return axiosPost(API_ROUTER.ADD_PRODUCTS, data);
};
