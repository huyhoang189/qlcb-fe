import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lichSuDieuDongs: [],
  lichSuDieuDong: {
    id: null,
    dot: "",
    nam: "",
    tieu_de: "",
    noi_dung: null,
    ghi_chu: "",
    so_luong: null,
  },
  selectedLichSuDieuDong: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "lichSuDieuDongs",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedLichSuDieuDong =
        action.payload !== null ? action.payload : initialState.lichSuDieuDong;
    },
    getLichSuDieuDongById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getLichSuDieuDongByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedLichSuDieuDong = action.payload;
    },
    getLichSuDieuDongByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedLichSuDieuDong = action.payload
        ? action.payload
        : state.lichSuDieuDong;
    },
    getLichSuDieuDongs: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getLichSuDieuDongsSuccess: (state, action) => {
      state.errorMassage = false;
      state.lichSuDieuDongs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getLichSuDieuDongsError: (state, action) => {
      state.errorMassage = "Error";
      state.lichSuDieuDongs = action.payload
        ? action.payload
        : state.lichSuDieuDongs;
      state.isLoading = false;
    },
    handleLichSuDieuDong: (state, action) => {},
    handleLichSuDieuDongSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedLichSuDieuDong = action.payload;
    },
    handleLichSuDieuDongError: (state, action) => {},
    updateSelectedLichSuDieuDongInput: (state, action) => {
      state.selectedLichSuDieuDong = action.payload;
    },
  },
});

export default reducer;
