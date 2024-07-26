import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/cap-chung-nhan/get-all-by-ma-can-bo/${
      payload?.ma_can_bo
    }?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/cap-chung-nhan`,
    method: "POST",
    data: payload,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/cap-chung-nhan/${payload?.id}`,
    method: "PUT",
    data: payload,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/cap-chung-nhan/${payload?.id}`,
    method: "DELETE",
  });
};
