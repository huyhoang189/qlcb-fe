import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chiTietKeHoachs: [],
  chiTietKeHoach: {
    id: "",
    ma_ke_hoach: "",
    ma_truong_hoc: "",
    ma_chuyen_nganh:"",
    ma_loai_hinh_dao_tao:"",
    thoi_gian_bat_dau:"",
    thoi_gian_ket_thuc:"",
    chi_tieu: "",
    thuc_hien: "",
    ghi_chu: "",
    truong_hoc: {
        id: "",
        ten_truong: ""
    },
    chuyen_nganh: {
        id: "",
        ten: ""
    },
    loai_hinh_dao_tao: {
        id: "",
        ten: ""
    },
    created_at: "",
    updated_at: "",
  },
  selectedChiTietKeHoach: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "chiTietKeHoachs",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedChiTietKeHoach =
        action.payload !== null ? action.payload : initialState.chiTietKeHoach;
    },
    getChiTietKeHoachById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getChiTietKeHoachByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedChiTietKeHoach = action.payload;
    },
    getChiTietKeHoachByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedChiTietKeHoach = action.payload
        ? action.payload
        : state.chiTietKeHoach;
    },
    getChiTietKeHoachs: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getChiTietKeHoachsSuccess: (state, action) => {
      state.errorMassage = false;
      state.chiTietKeHoachs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getChiTietKeHoachsError: (state, action) => {
      state.errorMassage = "Error";
      state.chiTietKeHoachs = action.payload ? action.payload : state.chiTietKeHoachs;
      state.isLoading = false;
    },
    handleChiTietKeHoach: (state, action) => {},
    handleChiTietKeHoachSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedChiTietKeHoach = action.payload;
    },
    handleChiTietKeHoachError: (state, action) => {},
    updateSelectedChiTietKeHoachInput: (state, action) => {
      state.selectedChiTietKeHoach = action.payload;
    },
  },
});

export default reducer;
