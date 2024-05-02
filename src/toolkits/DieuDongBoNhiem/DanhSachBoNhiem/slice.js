import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachBoNhiems: [],
  danhSachBoNhiem: {
    id: "",
    ten_chuc_danh: "",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
  },
  selectedDanhSachBoNhiem: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "danhSachBoNhiems",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedDanhSachBoNhiem =
        action.payload !== null ? action.payload : initialState.danhSachBoNhiem;
    },
    getDanhSachBoNhiemById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getDanhSachBoNhiemByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedDanhSachBoNhiem = action.payload;
    },
    getDanhSachBoNhiemByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedDanhSachBoNhiem = action.payload
        ? action.payload
        : state.danhSachBoNhiem;
    },
    getDanhSachBoNhiems: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getDanhSachBoNhiemsSuccess: (state, action) => {
      state.errorMassage = false;
      state.danhSachBoNhiems = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getDanhSachBoNhiemsError: (state, action) => {
      state.errorMassage = "Error";
      state.danhSachBoNhiems = action.payload
        ? action.payload
        : state.danhSachBoNhiems;
      state.isLoading = false;
    },
    handleDanhSachBoNhiem: (state, action) => {},
    handleDanhSachBoNhiemSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedDanhSachBoNhiem = action.payload;
    },
    handleDanhSachBoNhiemError: (state, action) => {},
    updateSelectedDanhSachBoNhiemInput: (state, action) => {
      state.selectedDanhSachBoNhiem = action.payload;
    },
  },
});

export default reducer;
