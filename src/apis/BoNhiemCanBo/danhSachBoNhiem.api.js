import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/bo-nhiem-can-bo/danh-sach/${payload?.ma_bo_nhiem}?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/bo-nhiem-can-bo/danh-sach`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/bo-nhiem-can-bo/danh-sach/${payload.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/bo-nhiem-can-bo/danh-sach/${payload?.id}`,
    method: "DELETE",
  });
};
