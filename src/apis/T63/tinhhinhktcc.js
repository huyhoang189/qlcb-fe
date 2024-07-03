import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-ca-nhan-con-cai?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&ma_can_bo=${
      payload?.ma_can_bo
    }`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-ca-nhan-con-cai`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-ca-nhan-con-cai/${payload?.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-ca-nhan-con-cai/${payload?.id}`,
    method: "DELETE",
  });
};
