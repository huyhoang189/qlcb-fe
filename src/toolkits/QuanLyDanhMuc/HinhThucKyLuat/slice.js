import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hinhThucKyLuats: [],
  hinhThucKyLuat: {
    id: null,
    ten: "",
    viet_tat:"",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
  },
  selectedHinhThucKyLuat: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "hinhThucKyLuats",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedHinhThucKyLuat =
        action.payload !== null ? action.payload : initialState.hinhThucKyLuat;
    },
    getHinhThucKyLuatById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getHinhThucKyLuatByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedHinhThucKyLuat = action.payload;
    },
    getHinhThucKyLuatByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedHinhThucKyLuat = action.payload
        ? action.payload
        : state.hinhThucKyLuat;
    },
    getHinhThucKyLuats: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getHinhThucKyLuatsSuccess: (state, action) => {
      state.errorMassage = false;
      state.hinhThucKyLuats = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getHinhThucKyLuatsError: (state, action) => {
      state.errorMassage = "Error";
      state.hinhThucKyLuats = action.payload
        ? action.payload
        : state.hinhThucKyLuats;
      state.isLoading = false;
    },
    handleHinhThucKyLuat: (state, action) => {},
    handleHinhThucKyLuatSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedHinhThucKyLuat = action.payload;
    },
    handleHinhThucKyLuatError: (state, action) => {},
    updateSelectedHinhThucKyLuatInput: (state, action) => {
      state.selectedHinhThucKyLuat = action.payload;
    },
  },
});

export default reducer;
