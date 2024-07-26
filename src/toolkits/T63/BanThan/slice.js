import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banThans: [],
  banThan: {
    ho_ten_khai_sinh: "",
    so_hieu_quan_nhan: "",
    ngay_thang_nam_sinh: "",
    ngay_chinh_thuc: "",
    ngay_vao_dang: "",
    ngay_nhap_ngu: "",
    que_quan: "",
    noi_o_hien_nay: "",
    trinh_do_giao_duc_pho_thong: ""
  },
  selectedBanThan: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "banThans",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      // state.selectedBanThan =
      //   action.payload !== null ? action.payload : initialState.banThan;
  },
    openTab: (state, action) => {
      state.selectedBanThan =
        action.payload !== null ? action.payload : initialState.banThan;
    },
    getBanThanById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getBanThanByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedBanThan = action.payload;
    },
    getBanThanByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedBanThan = action.payload
        ? action.payload
        : state.banThan;
    },
    getBanThans: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getBanThansSuccess: (state, action) => {
      state.errorMassage = false;
      state.banThans = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getBanThansError: (state, action) => {
      state.errorMassage = "Error";
      state.banThans = action.payload
        ? action.payload
        : state.banThans;
      state.isLoading = false;
    },
    handleBanThan: (state, action) => {},
    handleBanThanSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedBanThan = action.payload;
    },
    handleBanThanError: (state, action) => {},
    updateSelectedBanThanInput: (state, action) => {
      state.selectedBanThan = action.payload;
    },
  },
});

export default reducer;
