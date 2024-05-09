import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachThiSinhs: [],
  danhSachThiSinh: {
    id: null,
    ma_ky_thi: null,
    ma_thi_sinh: null,
    ket_qua: "Giỏi",
    noi_dung_thi: "",
    ghi_chu: "",
  },
  selectedDanhSachThiSinh: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "danhSachThiSinhs",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedDanhSachThiSinh =
        action.payload !== null ? action.payload : initialState.danhSachThiSinh;
    },
    getDanhSachThiSinhById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getDanhSachThiSinhByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedDanhSachThiSinh = action.payload;
    },
    getDanhSachThiSinhByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedDanhSachThiSinh = action.payload
        ? action.payload
        : state.danhSachThiSinh;
    },
    getDanhSachThiSinhs: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getDanhSachThiSinhsSuccess: (state, action) => {
      state.errorMassage = false;
      state.danhSachThiSinhs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getDanhSachThiSinhsError: (state, action) => {
      state.errorMassage = "Error";
      state.danhSachThiSinhs = action.payload
        ? action.payload
        : state.danhSachThiSinhs;
      state.isLoading = false;
    },
    handleDanhSachThiSinh: (state, action) => {},
    handleDanhSachThiSinhSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedDanhSachThiSinh = action.payload;
    },
    handleDanhSachThiSinhError: (state, action) => {},
    updateSelectedDanhSachThiSinhInput: (state, action) => {
      state.selectedDanhSachThiSinh = action.payload;
    },
  },
});

export default reducer;
