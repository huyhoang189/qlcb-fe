import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/nguoi-dung?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/nguoi-dung`,
    method: "POST",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/nguoi-dung/${payload?.id}`,
    method: "DELETE",
  });
};

export const getSessionUser = (payload) => {
  return api.makeRequest({
    url: `/nguoi-dung/thong-tin-tai-khoan`,
    method: "GET",
  });
};

export const login = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/authen/dang-nhap`,
    method: "POST",
    data: payload,
  });
};
