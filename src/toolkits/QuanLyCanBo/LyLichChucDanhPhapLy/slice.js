import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lyLichChucDanhPhapLys: [],
  lyLichChucDanhPhapLy: {
    id: "",
    ma_can_bo: "",
    ma_chuc_danh: "",
    thoi_gian_bat_dau: "",
    thoi_gian_ket_thuc: "",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
    ma_don_vi: "",
  },
  selectedLyLichChucDanhPhapLy: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "lyLichChucDanhPhapLys",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedLyLichChucDanhPhapLy =
        action.payload !== null
          ? action.payload
          : initialState.lyLichChucDanhPhapLy;
    },
    getLyLichChucDanhPhapLyById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getLyLichChucDanhPhapLyByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedLyLichChucDanhPhapLy = action.payload;
    },
    getLyLichChucDanhPhapLyByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedLyLichChucDanhPhapLy = action.payload
        ? action.payload
        : state.lyLichChucDanhPhapLy;
    },
    getLyLichChucDanhPhapLys: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getLyLichChucDanhPhapLysSuccess: (state, action) => {
      state.errorMassage = false;
      state.lyLichChucDanhPhapLys = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getLyLichChucDanhPhapLysError: (state, action) => {
      state.errorMassage = "Error";
      state.lyLichChucDanhPhapLys = action.payload
        ? action.payload
        : state.lyLichChucDanhPhapLys;
      state.isLoading = false;
    },
    handleLyLichChucDanhPhapLy: (state, action) => {},
    handleLyLichChucDanhPhapLySuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedLyLichChucDanhPhapLy = action.payload;
    },
    handleLyLichChucDanhPhapLyError: (state, action) => {},
    updateSelectedLyLichChucDanhPhapLyInput: (state, action) => {
      state.selectedLyLichChucDanhPhapLy = action.payload;
    },
  },
});

export default reducer;
