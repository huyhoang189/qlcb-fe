import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    chungNhanCaps: [],
    chungNhanCap: {
        id: "",
        ma_chung_nhan:"",
        ma_can_bo: "",
        thoi_gian_nhan: "",
        so_chung_nhan: "",
        hinh_anh_mat_truoc: "",
        hinh_anh_mat_sau: "",
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedChungNhanCap: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "chungNhanCaps",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedChungNhanCap =
                action.payload !== null ? action.payload : initialState.chungNhanCap;
        },
        getChungNhanCapById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getChungNhanCapByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedChungNhanCap = action.payload;
        },
        getChungNhanCapByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedChungNhanCap = action.payload
                ? action.payload
                : state.chungNhanCap;
        },
        getChungNhanCaps: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getChungNhanCapsSuccess: (state, action) => {
            state.errorMassage = false;
            state.chungNhanCaps = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getChungNhanCapsError: (state, action) => {
            state.errorMassage = "Error";
            state.chungNhanCaps = action.payload
                ? action.payload
                : state.chungNhanCaps;
            state.isLoading = false;
        },
        handleChungNhanCap: (state, action) => {
        },
        handleChungNhanCapSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedChungNhanCap = action.payload;
        },
        handleChungNhanCapError: (state, action) => {
        },
        updateSelectedChungNhanCapInput: (state, action) => {
            state.selectedChungNhanCap = action.payload;
        },

    },
});

export default reducer;