import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/bddt-ke-hoach/chi-tiet/${payload?.ma_ke_hoach}?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/bddt-ke-hoach/chi-tiet`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/bddt-ke-hoach/chi-tiet/${payload.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/bddt-ke-hoach/chi-tiet/${payload?.id}`,
    method: "DELETE",
  });
};
