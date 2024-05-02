import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    quanLyKyLuats: [],
    quanLyKyLuat: {
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
    selectedQuanLyKyLuat: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "quanLyKyLuats",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedQuanLyKyLuat =
                action.payload !== null ? action.payload : initialState.quanLyKyLuat;
        },
        getQuanLyKyLuatById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getQuanLyKyLuatByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedQuanLyKyLuat = action.payload;
        },
        getQuanLyKyLuatByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedQuanLyKyLuat = action.payload
                ? action.payload
                : state.quanLyKyLuat;
        },
        getQuanLyKyLuats: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getQuanLyKyLuatsSuccess: (state, action) => {
            state.errorMassage = false;
            state.quanLyKyLuats = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getQuanLyKyLuatsError: (state, action) => {
            state.errorMassage = "Error";
            state.quanLyKyLuats = action.payload
                ? action.payload
                : state.quanLyKyLuats;
            state.isLoading = false;
        },
        handleQuanLyKyLuat: (state, action) => {
        },
        handleQuanLyKyLuatSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedQuanLyKyLuat = action.payload;
        },
        handleQuanLyKyLuatError: (state, action) => {
        },
        updateSelectedQuanLyKyLuatInput: (state, action) => {
            state.selectedQuanLyKyLuat = action.payload;
        },

    },
});

export default reducer;