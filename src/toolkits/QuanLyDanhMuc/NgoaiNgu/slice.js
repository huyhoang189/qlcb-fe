import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ngoaiNgus: [],
  ngoaiNgu: {
    id: null,
    ten_ngoai_ngu: "",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
  },
  selectedNgoaiNgu: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "ngoaiNgus",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedNgoaiNgu =
        action.payload !== null ? action.payload : initialState.ngoaiNgu;
    },
    getNgoaiNguById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getNgoaiNguByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedNgoaiNgu = action.payload;
    },
    getNgoaiNguByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedNgoaiNgu = action.payload
        ? action.payload
        : state.ngoaiNgu;
    },
    getNgoaiNgus: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getNgoaiNgusSuccess: (state, action) => {
      state.errorMassage = false;
      state.ngoaiNgus = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getNgoaiNgusError: (state, action) => {
      state.errorMassage = "Error";
      state.ngoaiNgus = action.payload ? action.payload : state.ngoaiNgus;
      state.isLoading = false;
    },
    handleNgoaiNgu: (state, action) => {},
    handleNgoaiNguSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedNgoaiNgu = action.payload;
    },
    handleNgoaiNguError: (state, action) => {},
    updateSelectedNgoaiNguInput: (state, action) => {
      state.selectedNgoaiNgu = action.payload;
    },
  },
});

export default reducer;
