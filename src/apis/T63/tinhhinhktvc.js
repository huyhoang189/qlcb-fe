import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-ca-nhan?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&filter=${payload?.keyword || ""}&ma_can_bo=${
      payload?.ma_can_bo
    }`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-ca-nhan`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-ca-nhan/${payload?.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-ca-nhan/${payload?.id}`,
    method: "DELETE",
  });
};
