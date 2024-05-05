import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/dths-khen-thuong-ky-luat/${payload?.ma_khen_thuong_ky_luat}?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/dths-khen-thuong-ky-luat/chi-tiet/${payload?.id}`,
    method: "DELETE",
  });
};
