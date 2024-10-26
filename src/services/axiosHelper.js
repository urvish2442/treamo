import axiosInstance from "@/utils/axios";
import { getData } from "@/utils/storage";
import { API_ROUTER } from "./apiRouter";

export const axiosPost = async (
    url,
    data,
    contentType = "application/json",
) => {
    let response = {};
    let header = {};
    const token = getData("token");
    const userAuth = token?.access_token;
    if (userAuth) {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
            Authorization: `Bearer ${userAuth}`,
        };
    } else {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
        };
    }
    try {
        const result = await axiosInstance.post(url, data, {
            headers: header,
        });
        response.data = result.data;
        response.status = [200, 201].includes(result.status);
    } catch (e) {
        response.status = false;
        response.message = e?.response?.data?.detail;
        response.data = e?.response?.data || e;
        console.log("🚀 ~ response:", response);
    }
    return response;
};
export const axiosGet = async (
    url,
    params = {},
    contentType = "application/json",
) => {
    let response = {};
    let header = {};

    const token = getData("token");
    // console.log("get__token", token);
    const userAuth = token?.access_token;

    if (userAuth) {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
            Authorization: `Bearer ${userAuth}`,
        };
    } else {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
        };
    }
    // console.log("url", url);
    try {
        const result = await axiosInstance.get(url, {
            headers: header,
            params,
        });
        // console.log("response", result);
        response.data = result.data;
        response.status = [200, 201].includes(result.status);
    } catch (e) {
        console.log("e", e);
        if (e.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
        response.status = false;
        response.message = "something went wrong";
        response.data = e;
    }
    return response;
};

export const axiosPatch = async (
    url,
    data,
    contentType = "application/json",
) => {
    let response = {};
    let header = {};

    const token = getData("token");
    const userAuth = token?.access_token;
    if (userAuth) {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
            Authorization: `Bearer ${userAuth}`,
        };
    } else {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
        };
    }
    try {
        const result = await axiosInstance.patch(url, data, {
            headers: header,
        });
        response.data = result.data;
        response.status =
            result.data?.status || [200, 201].includes(result.status);
    } catch (e) {
        response.status = false;
        response.message =
            e?.response?.data?.detail ||
            e?.response?.data?.details ||
            "something went wrong";
        response.data = e;
    }
    return response;
};

export const axiosPut = async (url, data, contentType = "application/json") => {
    let response = {};
    let header = {};
    const token = getData("token");
    const userAuth = token?.access_token;
    if (userAuth) {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
            Authorization: `Bearer ${userAuth}`,
        };
    } else {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
        };
    }
    try {
        const result = await axiosInstance.put(url, data, {
            headers: header,
        });
        response.data = result.data;
        response.status = [200, 201].includes(result.status);
    } catch (e) {
        response.status = false;
        response.message = "something went wrong";
        response.data = e;
    }
    return response;
};

export const axiosDelete = async (
    url,
    data,
    contentType = "application/json",
) => {
    let response = {};
    let header = {};
    const token = getData("token");
    const userAuth = token?.access_token;
    if (userAuth) {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
            Authorization: `Bearer ${userAuth}`,
        };
    } else {
        header = {
            "Content-Type": contentType,
            Accept: "*/*",
        };
    }
    try {
        const result = await axiosInstance.delete(url, {
            headers: header,
        });
        response = result.data;
        response.status = [200, 201].includes(result.status);
    } catch (e) {
        response.status = false;
        response.message = "something went wrong";
        response.data = e;
    }
    return response;
};

export const uploadFile = (file, fileName = "") =>
    new Promise(async (resolve) => {
        try {
            const endpointsRes = await axiosPost(API_ROUTER.UPLOAD_FILE, {
                filename: fileName || file?.name,
            });
            if (endpointsRes.status) {
                const { signed_url, public_url } = endpointsRes.data;

                const uploadResponse = await fetch(signed_url, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": "application/octet-stream",
                    },
                });
                if (uploadResponse.ok) {
                    resolve({
                        status: true,
                        url: public_url,
                    });
                } else {
                    resolve({
                        status: false,
                        url: "",
                    });
                }
            } else {
                resolve({
                    status: false,
                    url: "",
                });
            }
        } catch (error) {
            resolve({
                status: false,
                url: "",
            });
        }
    });
