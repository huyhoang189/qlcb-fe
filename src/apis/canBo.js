import createAPIServices from "../apis/base.api.js";

const api = createAPIServices();

export const getAllBase = (payload) => {
  return api.makeRequest({
    url: `/can-bo/get-all-base?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const getAllByMaDonVi = (payload) => {
  return api.makeRequest({
    url: `/can-bo/get-all-by-ma-don-vi/${payload?.ma_don_vi}?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const getById = (payload) => {
  return api.makeRequest({
    url: `/can-bo/${payload?.id}`,
    method: "GET",
    data: payload,
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/can-bo`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/can-bo/${payload?.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/can-bo/${payload?.id}`,
    method: "DELETE",
  });
};
