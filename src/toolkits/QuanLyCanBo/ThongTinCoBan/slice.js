import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    canBoCoBans: [],
    canBoCoBan: {
        id: '',
        ten_chuc_danh: '',
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedCanBoCoBan: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "canBoCoBans",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedCanBoCoBan =
                action.payload !== null ? action.payload : initialState.canBoCoBan;
        },
        getCanBoCoBanById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getCanBoCoBanByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedCanBoCoBan = action.payload;
        },
        getCanBoCoBanByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedCanBoCoBan = action.payload
                ? action.payload
                : state.canBoCoBan;
        },
        getCanBoCoBans: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getCanBoCoBansSuccess: (state, action) => {
            state.errorMassage = false;
            state.canBoCoBans = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getCanBoCoBansError: (state, action) => {
            state.errorMassage = "Error";
            state.canBoCoBans = action.payload
                ? action.payload
                : state.canBoCoBans;
            state.isLoading = false;
        },
        handleCanBoCoBan: (state, action) => {
        },
        handleCanBoCoBanSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedCanBoCoBan = action.payload;
        },
        handleCanBoCoBanError: (state, action) => {
        },
        updateSelectedCanBoCoBanInput: (state, action) => {
            state.selectedCanBoCoBan = action.payload;
        },

    },
});

export default reducer;