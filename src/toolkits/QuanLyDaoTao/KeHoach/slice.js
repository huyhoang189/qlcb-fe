import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keHoachs: [],
  keHoach: {
    id: "",
    nam_hoc: "",
    chi_tieu: "",
    thuc_hien:"",
    ghi_chu:"",
    created_at: "",
    updated_at: "",
  },
  selectedKeHoach: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "keHoachs",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedKeHoach =
        action.payload !== null ? action.payload : initialState.keHoach;
    },
    getKeHoachById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getKeHoachByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedKeHoach = action.payload;
    },
    getKeHoachByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedKeHoach = action.payload
        ? action.payload
        : state.keHoach;
    },
    getKeHoachs: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getKeHoachsSuccess: (state, action) => {
      state.errorMassage = false;
      state.keHoachs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getKeHoachsError: (state, action) => {
      state.errorMassage = "Error";
      state.keHoachs = action.payload ? action.payload : state.keHoachs;
      state.isLoading = false;
    },
    handleKeHoach: (state, action) => {},
    handleKeHoachSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedKeHoach = action.payload;
    },
    handleKeHoachError: (state, action) => {},
    updateSelectedKeHoachInput: (state, action) => {
      state.selectedKeHoach = action.payload;
    },
  },
});

export default reducer;
