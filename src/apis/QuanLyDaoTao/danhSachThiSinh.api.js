import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/ky-thi-chuyen-mon-nghiep-vu/danh-sach-thi-sinh/${
      payload?.ma_ky_thi
    }?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/ky-thi-chuyen-mon-nghiep-vu/danh-sach-thi-sinh`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/ky-thi-chuyen-mon-nghiep-vu/danh-sach-thi-sinh/${payload?.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/ky-thi-chuyen-mon-nghiep-vu/danh-sach-thi-sinh/${payload?.id}`,
    method: "DELETE",
  });
};
