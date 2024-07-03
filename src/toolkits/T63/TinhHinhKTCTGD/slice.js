import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tinhHinhKTCTGDs: [],
  tinhHinhKTCTGD: {
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
    tinh_hinh_kinh_te: "",
    tinh_hinh_chinh_tri: ""
  },
  selectedTinhHinhKTCTGD: {},
  errorMassage: false,
  isLoading: false,
  //modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "tinhHinhKTCTGDs",
  initialState,
  reducers: {
    openTab: (state, action) => {
      //state.modalActive = !state.modalActive;
      state.selectedTinhHinhKTCTGD =
        action.payload !== null ? action.payload : initialState.tinhHinhKTCTGD;
    },
    getTinhHinhKTCTGDById: (state, action) => {
      //state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getTinhHinhKTCTGDByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedTinhHinhKTCTGD = action.payload;
    },
    getTinhHinhKTCTGDByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedTinhHinhKTCTGD = action.payload
        ? action.payload
        : state.tinhHinhKTCTGD;
    },
    getTinhHinhKTCTGDs: (state, action) => {
      //state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getTinhHinhKTCTGDsSuccess: (state, action) => {
      state.errorMassage = false;
      state.tinhHinhKTCTGDs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getTinhHinhKTCTGDsError: (state, action) => {
      state.errorMassage = "Error";
      state.tinhHinhKTCTGDs = action.payload
        ? action.payload
        : state.tinhHinhKTCTGDs;
      state.isLoading = false;
    },
    handleTinhHinhKTCTGD: (state, action) => {},
    handleTinhHinhKTCTGDSuccess: (state, action) => {
      //state.modalActive = false;
      state.errorMassage = false;
      state.selectedTinhHinhKTCTGD = action.payload;
    },
    handleTinhHinhKTCTGDError: (state, action) => {},
    updateSelectedTinhHinhKTCTGDInput: (state, action) => {
      state.selectedTinhHinhKTCTGD = action.payload;
    },
  },
});

export default reducer;
