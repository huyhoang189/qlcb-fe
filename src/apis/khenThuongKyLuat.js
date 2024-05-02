import createAPIServices from "../apis/base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
    return api.makeRequest({
        url: `/dths-khen-thuong-ky-luat?pageSize=${payload?.pageSize || 10}&pageNumber=${payload?.pageNumber || 1}&filter=${payload?.keyword || ""}&type=${payload?.type || "KHEN_THUONG"}`,
        method: "GET",
    });

};

export const create = (payload) => {
    return api.makeRequest({
        url: `/dths-khen-thuong-ky-luat`,
        method: "POST",
        data: payload,
    });
};

export const detail = (payload) => {
    return api.makeRequest({
        url: `/dths-khen-thuong-ky-luat/${payload?.id}`,
        method: "GET",
        data: payload,
    });
};

export const deleteItemDetail = (payload) => {
    return api.makeRequest({
        url: `/dths-khen-thuong-ky-luat/chi-tiet/${payload?.id}`,
        method: "DELETE",
    });
};

export const deleteItem = (payload) => {
    return api.makeRequest({
        url: `/dths-khen-thuong-ky-luat/${payload?.id}`,
        method: "DELETE",
    });
};
