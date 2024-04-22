import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  truongHocs: [],
  truongHoc: {
    id: null,
    ten_truong: "",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
  },
  selectedTruongHoc: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "truongHocs",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedTruongHoc =
        action.payload !== null ? action.payload : initialState.truongHoc;
    },
    getTruongHocById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getTruongHocByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedTruongHoc = action.payload;
    },
    getTruongHocByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedTruongHoc = action.payload
        ? action.payload
        : state.truongHoc;
    },
    getTruongHocs: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getTruongHocsSuccess: (state, action) => {
      state.errorMassage = false;
      state.truongHocs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getTruongHocsError: (state, action) => {
      state.errorMassage = "Error";
      state.truongHocs = action.payload ? action.payload : state.truongHocs;
      state.isLoading = false;
    },
    handleTruongHoc: (state, action) => {},
    handleTruongHocSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedTruongHoc = action.payload;
    },
    handleTruongHocError: (state, action) => {},
    updateSelectedTruongHocInput: (state, action) => {
      state.selectedTruongHoc = action.payload;
    },
  },
});

export default reducer;
