import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachKhenThuongKyLuats: [],
  danhSachKhenThuongKyLuat: {
    id: "",
    hinh_anh: "",
    don_vi: {
       ten_don_vi: ""
    },
    can_bo: {
        ho_ten_khai_sinh: "",
        so_hieu_quan_nhan: "",
        don_vi: {
            ten_don_vi: ""
        }
    }
  },
  selectedDanhSachKhenThuongKyLuat: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "danhSachKhenThuongKyLuats",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedDanhSachKhenThuongKyLuat =
        action.payload !== null ? action.payload : initialState.danhSachKhenThuongKyLuat;
    },
    getDanhSachKhenThuongKyLuatById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getDanhSachKhenThuongKyLuatByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedDanhSachKhenThuongKyLuat = action.payload;
    },
    getDanhSachKhenThuongKyLuatByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedDanhSachKhenThuongKyLuat = action.payload
        ? action.payload
        : state.danhSachKhenThuongKyLuat;
    },
    getDanhSachKhenThuongKyLuats: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getDanhSachKhenThuongKyLuatsSuccess: (state, action) => {
      state.errorMassage = false;
      state.danhSachKhenThuongKyLuats = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getDanhSachKhenThuongKyLuatsError: (state, action) => {
      state.errorMassage = "Error";
      state.danhSachKhenThuongKyLuats = action.payload
        ? action.payload
        : state.danhSachKhenThuongKyLuats;
      state.isLoading = false;
    },
    handleDanhSachKhenThuongKyLuat: (state, action) => {},
    handleDanhSachKhenThuongKyLuatSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedDanhSachKhenThuongKyLuat = action.payload;
    },
    handleDanhSachKhenThuongKyLuatError: (state, action) => {},
    updateSelectedDanhSachKhenThuongKyLuatInput: (state, action) => {
      state.selectedDanhSachKhenThuongKyLuat = action.payload;
    },
  },
});

export default reducer;
