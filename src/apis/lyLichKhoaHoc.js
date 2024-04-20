import createAPIServices from "../apis/base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
    return api.makeRequest({
        url: `/ly-lich-khoa-hoc/get-all-by-ma-can-bo/${payload?.ma_can_bo}?pageSize=${payload?.pageSize || 10}&pageNumber=${payload?.pageNumber || 1}&filter=${payload?.keyword || ""}&maCanBo=${payload?.ma_can_bo}`,
        method: "GET",
    });

};

export const create = (payload) => {
    return api.makeRequest({
        url: `/ly-lich-khoa-hoc`,
        method: "POST",
        data: payload,
    });
};

export const update = (payload) => {
    return api.makeRequest({
        url: `/ly-lich-khoa-hoc/${payload?.id}`,
        method: "PUT",
        data: payload,
    });
};

export const deleteItem = (payload) => {
    return api.makeRequest({
        url: `/ly-lich-khoa-hoc/${payload?.id}`,
        method: "DELETE",
    });
};
