import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canBoCoBans: [],
  canBoCoBan: {
    id: null,
    ho_ten_khai_sinh: "",
    so_hieu_quan_nhan: "",
    ngay_thang_nam_sinh: "",
    ngay_chinh_thuc: "",
    ngay_vao_dang: "",
    ngay_nhap_ngu: "",
    que_quan: "",
    noi_o_hien_nay: "",
    trinh_do_giao_duc_pho_thong: null,
    created_at: "",
    updated_at: "",
    ma_don_vi_hien_tai: "",
  },
  selectedCanBoCoBan: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "canBoCoBans",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedCanBoCoBan =
        action.payload !== null ? action.payload : initialState.canBoCoBan;
    },
    getCanBoCoBanById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getCanBoCoBanByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedCanBoCoBan = action.payload;
    },
    getCanBoCoBanByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedCanBoCoBan = action.payload
        ? action.payload
        : state.canBoCoBan;
    },
    getCanBoCoBans: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getCanBoCoBansSuccess: (state, action) => {
      state.errorMassage = false;
      state.canBoCoBans = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getCanBoCoBansError: (state, action) => {
      state.errorMassage = "Error";
      state.canBoCoBans = action.payload ? action.payload : state.canBoCoBans;
      state.isLoading = false;
    },
    handleCanBoCoBan: (state, action) => {},
    handleCanBoCoBanSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedCanBoCoBan = action.payload;
    },
    handleCanBoCoBanError: (state, action) => {},
    updateSelectedCanBoCoBanInput: (state, action) => {
      state.selectedCanBoCoBan = action.payload;
    },
  },
});

export default reducer;
