import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    donVis: [],
    donVi: {
        id: '',
        ma_don_vi: "",
        ten_don_vi: "",
        ma_don_vi_cha: "",
        ghi_chu: "",
        so_thu_tu: 0
    },
    selectedDonVi: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "donVis",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedDonVi =
                action.payload !== null ? action.payload : initialState.donVi;
        },
        getDonViById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getDonViByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedDonVi = action.payload;
        },
        getDonViByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedDonVi = action.payload
                ? action.payload
                : state.donVi;
        },
        getDonVis: (state, action) => {
            // state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getDonVisSuccess: (state, action) => {
            state.errorMassage = false;
            state.donVis = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getDonVisError: (state, action) => {
            state.errorMassage = "Error";
            state.donVis = action.payload
                ? action.payload
                : state.donVis;
            state.isLoading = false;
        },
        handleDonVi: (state, action) => {
        },
        handleDonViSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedDonVi = action.payload;
        },
        handleDonViError: (state, action) => {
        },
        updateSelectedDonViInput: (state, action) => {
            state.selectedDonVi = action.payload;
        },

    },
});

export default reducer;