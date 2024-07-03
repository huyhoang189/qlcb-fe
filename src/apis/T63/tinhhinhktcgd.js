import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-gia-dinh?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&ma_can_bo=${
      payload?.ma_can_bo
    }`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-gia-dinh`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-gia-dinh/${payload?.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/tinh-hinh-kinh-te-chinh-tri-gia-dinh/${payload?.id}`,
    method: "DELETE",
  });
};
