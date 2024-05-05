import createAPIServices from "../apis/base.api.js";

const api = createAPIServices();

export const thongKeTheoChucDanhPhapLy = (payload) => {
  return api.makeRequest({
    url: `/thong-ke/thong-ke-theo-chuc-danh`,
    method: "GET",
  });
};

export const thongKeTheoQuanHam = (payload) => {
  return api.makeRequest({
    url: `/thong-ke/thong-ke-theo-quan-ham`,
    method: "GET",
  });
};
