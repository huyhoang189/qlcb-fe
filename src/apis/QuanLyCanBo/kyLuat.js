import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/ky-luat/get-all-by-ma-can-bo/${
      payload?.ma_can_bo
    }?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/ky-luat`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/ky-luat/${payload?.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/ky-luat/${payload?.id}`,
    method: "DELETE",
  });
};
