import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tinhHinhKTCTVCs: [],
  tinhHinhKTCTVC: {
    ma_can_bo: "",
    cha_ten: "",
    cha_nam_sinh: "",
    cha_nghe_nghiep: "",
    me_ten: "",
    me_nam_sinh: "",
    me_nghe_nghiep: "",
    thanh_phan_gia_dinh: "",
    que_quan: "",
    cho_o_hien_nay: "",
    tinh_trang_gia_dinh: "",
    vo_chong_ten: "",
    vo_chong_nghe_nghiep: "",
    vo_chong_nam_sinh: "",
    vo_chong_noi_o_hien_ngay: ""
  },
  selectedTinhHinhKTCTVC: {},
  errorMassage: false,
  isLoading: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "tinhHinhKTCTVCs",
  initialState,
  reducers: {
    openTab: (state, action) => {
      state.selectedTinhHinhKTCTVC =
        action.payload !== null ? action.payload : initialState.tinhHinhKTCTVC;
    },
    getTinhHinhKTCTVCById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getTinhHinhKTCTVCByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedTinhHinhKTCTVC = action.payload;
    },
    getTinhHinhKTCTVCByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedTinhHinhKTCTVC = action.payload
        ? action.payload
        : state.tinhHinhKTCTVC;
    },
    getTinhHinhKTCTVCs: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getTinhHinhKTCTVCsSuccess: (state, action) => {
      state.errorMassage = false;
      state.tinhHinhKTCTVCs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getTinhHinhKTCTVCsError: (state, action) => {
      state.errorMassage = "Error";
      state.tinhHinhKTCTVCs = action.payload
        ? action.payload
        : state.tinhHinhKTCTVCs;
      state.isLoading = false;
    },
    handleTinhHinhKTCTVC: (state, action) => {},
    handleTinhHinhKTCTVCSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedTinhHinhKTCTVC = action.payload;
    },
    handleTinhHinhKTCTVCError: (state, action) => {},
    updateSelectedTinhHinhKTCTVCInput: (state, action) => {
      state.selectedTinhHinhKTCTVC = action.payload;
    },
  },
});

export default reducer;
