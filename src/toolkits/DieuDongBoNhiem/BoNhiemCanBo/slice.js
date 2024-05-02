import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boNhiemCanBos: [],
  boNhiemCanBo: {
    id: null,
    dot: "",
    nam: "",
    tieu_de: "",
    noi_dung: null,
    ghi_chu: "",
    so_luong: null,
  },
  selectedBoNhiemCanBo: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "boNhiemCanBos",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedBoNhiemCanBo =
        action.payload !== null ? action.payload : initialState.boNhiemCanBo;
    },
    getBoNhiemCanBoById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getBoNhiemCanBoByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedBoNhiemCanBo = action.payload;
    },
    getBoNhiemCanBoByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedBoNhiemCanBo = action.payload
        ? action.payload
        : state.boNhiemCanBo;
    },
    getBoNhiemCanBos: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getBoNhiemCanBosSuccess: (state, action) => {
      state.errorMassage = false;
      state.boNhiemCanBos = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getBoNhiemCanBosError: (state, action) => {
      state.errorMassage = "Error";
      state.boNhiemCanBos = action.payload
        ? action.payload
        : state.boNhiemCanBos;
      state.isLoading = false;
    },
    handleBoNhiemCanBo: (state, action) => {},
    handleBoNhiemCanBoSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedBoNhiemCanBo = action.payload;
    },
    handleBoNhiemCanBoError: (state, action) => {},
    updateSelectedBoNhiemCanBoInput: (state, action) => {
      state.selectedBoNhiemCanBo = action.payload;
    },
  },
});

export default reducer;
