import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/quan-ham/get-all-by-ma-can-bo/${
      payload?.ma_can_bo
    }?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/quan-ham`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/quan-ham/${payload?.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/quan-ham/${payload?.id}`,
    method: "DELETE",
  });
};
