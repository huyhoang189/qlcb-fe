import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kyThis: [],
  kyThi: {
    id: "",
    ten_ky_thi: "",
    thoi_gian_to_chuc: "",
    ket_qua:"",
    trang_thai:true,
    ghi_chu:'',
    created_at: "",
    updated_at: "",
  },
  selectedKyThi: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "kyThis",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedKyThi =
        action.payload !== null ? action.payload : initialState.kyThi;
    },
    getKyThiById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getKyThiByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedKyThi = action.payload;
    },
    getKyThiByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedKyThi = action.payload
        ? action.payload
        : state.kyThi;
    },
    getKyThis: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getKyThisSuccess: (state, action) => {
      state.errorMassage = false;
      state.kyThis = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getKyThisError: (state, action) => {
      state.errorMassage = "Error";
      state.kyThis = action.payload ? action.payload : state.kyThis;
      state.isLoading = false;
    },
    handleKyThi: (state, action) => {},
    handleKyThiSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedKyThi = action.payload;
    },
    handleKyThiError: (state, action) => {},
    updateSelectedKyThiInput: (state, action) => {
      state.selectedKyThi = action.payload;
    },
  },
});

export default reducer;
