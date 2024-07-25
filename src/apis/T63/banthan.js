import createAPIServices from "../base.api.js";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/can-bo/get-t63/${
      payload?.ma_can_bo
    }`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/can-bo`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/can-bo/${payload?.id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/can-bo/${payload?.id}`,
    method: "DELETE",
  });
};
