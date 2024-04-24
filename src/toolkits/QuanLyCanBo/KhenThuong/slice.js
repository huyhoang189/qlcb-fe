import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    khenThuongs: [],
    khenThuong: {
        id: "",
        ma_can_bo: "",
        hinh_thuc: "",
        noi_dung: "",
        thoi_gian: "",
        so_quyet_dinh: "",
        loai: "",
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedKhenThuong: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "khenThuongs",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedKhenThuong =
                action.payload !== null ? action.payload : initialState.khenThuong;
        },
        getKhenThuongById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getKhenThuongByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedKhenThuong = action.payload;
        },
        getKhenThuongByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedKhenThuong = action.payload
                ? action.payload
                : state.khenThuong;
        },
        getKhenThuongs: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getKhenThuongsSuccess: (state, action) => {
            state.errorMassage = false;
            state.khenThuongs = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getKhenThuongsError: (state, action) => {
            state.errorMassage = "Error";
            state.khenThuongs = action.payload
                ? action.payload
                : state.khenThuongs;
            state.isLoading = false;
        },
        handleKhenThuong: (state, action) => {
        },
        handleKhenThuongSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedKhenThuong = action.payload;
        },
        handleKhenThuongError: (state, action) => {
        },
        updateSelectedKhenThuongInput: (state, action) => {
            state.selectedKhenThuong = action.payload;
        },

    },
});

export default reducer;