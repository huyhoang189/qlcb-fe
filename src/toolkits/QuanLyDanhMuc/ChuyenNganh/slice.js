import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chuyenNganhs: [],
  chuyenNganh: {
    id: "",
    ten_chuc_danh: "",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
  },
  selectedChuyenNganh: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "chuyenNganhs",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedChuyenNganh =
        action.payload !== null ? action.payload : initialState.chuyenNganh;
    },
    getChuyenNganhById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getChuyenNganhByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedChuyenNganh = action.payload;
    },
    getChuyenNganhByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedChuyenNganh = action.payload
        ? action.payload
        : state.chuyenNganh;
    },
    getChuyenNganhs: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getChuyenNganhsSuccess: (state, action) => {
      state.errorMassage = false;
      state.chuyenNganhs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getChuyenNganhsError: (state, action) => {
      state.errorMassage = "Error";
      state.chuyenNganhs = action.payload ? action.payload : state.chuyenNganhs;
      state.isLoading = false;
    },
    handleChuyenNganh: (state, action) => {},
    handleChuyenNganhSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedChuyenNganh = action.payload;
    },
    handleChuyenNganhError: (state, action) => {},
    updateSelectedChuyenNganhInput: (state, action) => {
      state.selectedChuyenNganh = action.payload;
    },
  },
});

export default reducer;
