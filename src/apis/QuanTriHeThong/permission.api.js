import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/permission/${payload?.group_id}?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/permission`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/permission/${payload?.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/permission/${payload?.id}`,
    method: "DELETE",
  });
};

export const checkPermission = (payload) => {
  return api.makeRequest({
    url: `/permission/check-permission?group_id=${payload?.group_id}&role_id=${payload?.role_id}`,
    method: "PUT",
    data: payload,
  });
};

export const deletePermission = (payload) => {
  return api.makeRequest({
    url: `/permission/delete-permission?group_id=${payload?.group_id}&role_id=${payload?.role_id}`,
    method: "DELETE",
  });
};
