import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tinhHinhKTCTCCs: [],
  tinhHinhKTCTCC: {
    ma_can_bo: "",
    ten: "",
    nam_sinh: "",
    nghe_nghiep: "",
    noi_o_hien_nay:""
  },
  selectedTinhHinhKTCTCC: [],
  errorMassage: false,
  isLoading: false,
  //modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "tinhHinhKTCTCCs",
  initialState,
  reducers: {
    openTab: (state, action) => {
      //state.modalActive = !state.modalActive;
      state.selectedTinhHinhKTCTCC =
        action.payload !== null ? action.payload : initialState.tinhHinhKTCTCC;
    },
    getTinhHinhKTCTCCById: (state, action) => {
      //state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getTinhHinhKTCTCCByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedTinhHinhKTCTCC = action.payload;
    },
    getTinhHinhKTCTCCByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedTinhHinhKTCTCC = action.payload
        ? action.payload
        : state.tinhHinhKTCTCC;
    },
    getTinhHinhKTCTCCs: (state, action) => {
      //state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getTinhHinhKTCTCCsSuccess: (state, action) => {
      state.errorMassage = false;
      state.tinhHinhKTCTCCs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getTinhHinhKTCTCCsError: (state, action) => {
      state.errorMassage = "Error";
      state.tinhHinhKTCTCCs = action.payload
        ? action.payload
        : state.tinhHinhKTCTCCs;
      state.isLoading = false;
    },
    handleTinhHinhKTCTCC: (state, action) => {},
    handleTinhHinhKTCTCCSuccess: (state, action) => {
      //state.modalActive = false;
      state.errorMassage = false;
      state.selectedTinhHinhKTCTCC = action.payload;
    },
    handleTinhHinhKTCTCCError: (state, action) => {},
    updateSelectedTinhHinhKTCTCCInput: (state, action) => {
      state.selectedTinhHinhKTCTCC = action.payload;
    },
  },
});

export default reducer;
