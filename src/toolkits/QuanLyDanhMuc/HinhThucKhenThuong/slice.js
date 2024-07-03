import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hinhThucKhenThuongs: [],
  hinhThucKhenThuong: {
    id: null,
    ten: "",
    viet_tat:"",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
  },
  selectedHinhThucKhenThuong: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "hinhThucKhenThuongs",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedHinhThucKhenThuong =
        action.payload !== null ? action.payload : initialState.hinhThucKhenThuong;
    },
    getHinhThucKhenThuongById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getHinhThucKhenThuongByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedHinhThucKhenThuong = action.payload;
    },
    getHinhThucKhenThuongByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedHinhThucKhenThuong = action.payload
        ? action.payload
        : state.hinhThucKhenThuong;
    },
    getHinhThucKhenThuongs: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getHinhThucKhenThuongsSuccess: (state, action) => {
      state.errorMassage = false;
      state.hinhThucKhenThuongs = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getHinhThucKhenThuongsError: (state, action) => {
      state.errorMassage = "Error";
      state.hinhThucKhenThuongs = action.payload
        ? action.payload
        : state.hinhThucKhenThuongs;
      state.isLoading = false;
    },
    handleHinhThucKhenThuong: (state, action) => {},
    handleHinhThucKhenThuongSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedHinhThucKhenThuong = action.payload;
    },
    handleHinhThucKhenThuongError: (state, action) => {},
    updateSelectedHinhThucKhenThuongInput: (state, action) => {
      state.selectedHinhThucKhenThuong = action.payload;
    },
  },
});

export default reducer;
