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


