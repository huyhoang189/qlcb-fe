import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    baoHiems: [],
    baoHiem: {
        id: "",
        ma_can_bo: "",
        he_so: "",
        quan_ham: "",
        thoi_gian: "",
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedBaoHiem: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "baoHiems",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedBaoHiem =
                action.payload !== null ? action.payload : initialState.baoHiem;
        },
        getBaoHiemById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getBaoHiemByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedBaoHiem = action.payload;
        },
        getBaoHiemByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedBaoHiem = action.payload
                ? action.payload
                : state.baoHiem;
        },
        getBaoHiems: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getBaoHiemsSuccess: (state, action) => {
            state.errorMassage = false;
            state.baoHiems = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getBaoHiemsError: (state, action) => {
            state.errorMassage = "Error";
            state.baoHiems = action.payload
                ? action.payload
                : state.baoHiems;
            state.isLoading = false;
        },
        handleBaoHiem: (state, action) => {
        },
        handleBaoHiemSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedBaoHiem = action.payload;
        },
        handleBaoHiemError: (state, action) => {
        },
        updateSelectedBaoHiemInput: (state, action) => {
            state.selectedBaoHiem = action.payload;
        },

    },
});

export default reducer;