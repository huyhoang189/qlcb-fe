import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    quanLyKhenThuongs: [],
    quanLyKhenThuong: {
        id: "",
        hinh_thuc: "",
        noi_dung: "",
        thoi_gian: "",
        ly_do:"",
        quyet_dinh_so:"",
        ghi_chu: '',
        loai:"",
        created_at: "",
        updated_at: ""
    },
    selectedQuanLyKhenThuong: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "quanLyKhenThuongs",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedQuanLyKhenThuong =
                action.payload !== null ? action.payload : initialState.quanLyKhenThuong;
        },
        getQuanLyKhenThuongById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getQuanLyKhenThuongByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedQuanLyKhenThuong = action.payload;
        },
        getQuanLyKhenThuongByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedQuanLyKhenThuong = action.payload
                ? action.payload
                : state.quanLyKhenThuong;
        },
        getQuanLyKhenThuongs: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getQuanLyKhenThuongsSuccess: (state, action) => {
            state.errorMassage = false;
            state.quanLyKhenThuongs = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getQuanLyKhenThuongsError: (state, action) => {
            state.errorMassage = "Error";
            state.quanLyKhenThuongs = action.payload
                ? action.payload
                : state.quanLyKhenThuongs;
            state.isLoading = false;
        },
        handleQuanLyKhenThuong: (state, action) => {
        },
        handleQuanLyKhenThuongSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedQuanLyKhenThuong = action.payload;
        },
        handleQuanLyKhenThuongError: (state, action) => {
        },
        updateSelectedQuanLyKhenThuongInput: (state, action) => {
            state.selectedQuanLyKhenThuong = action.payload;
        },

    },
});

export default reducer;