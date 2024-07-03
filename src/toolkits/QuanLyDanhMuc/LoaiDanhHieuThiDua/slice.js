import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaiDanhHieuThiDuas: [],
  loaiDanhHieuThiDua: {
    id: null,
    ten: "",
    viet_tat:"",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
  },
  selectedLoaiDanhHieuThiDua: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "loaiDanhHieuThiDuas",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedLoaiDanhHieuThiDua =
        action.payload !== null ? action.payload : initialState.loaiDanhHieuThiDua;
    },
    getLoaiDanhHieuThiDuaById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getLoaiDanhHieuThiDuaByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedLoaiDanhHieuThiDua = action.payload;
    },
    getLoaiDanhHieuThiDuaByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedLoaiDanhHieuThiDua = action.payload
        ? action.payload
        : state.loaiDanhHieuThiDua;
    },
    getLoaiDanhHieuThiDuas: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getLoaiDanhHieuThiDuasSuccess: (state, action) => {
      state.errorMassage = false;
      state.loaiDanhHieuThiDuas = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getLoaiDanhHieuThiDuasError: (state, action) => {
      state.errorMassage = "Error";
      state.loaiDanhHieuThiDuas = action.payload
        ? action.payload
        : state.loaiDanhHieuThiDuas;
      state.isLoading = false;
    },
    handleLoaiDanhHieuThiDua: (state, action) => {},
    handleLoaiDanhHieuThiDuaSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedLoaiDanhHieuThiDua = action.payload;
    },
    handleLoaiDanhHieuThiDuaError: (state, action) => {},
    updateSelectedLoaiDanhHieuThiDuaInput: (state, action) => {
      state.selectedLoaiDanhHieuThiDua = action.payload;
    },
  },
});

export default reducer;
