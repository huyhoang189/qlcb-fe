import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    trinhDoNgoaiNgus: [],
    trinhDoNgoaiNgu: {
        id: "",
        ma_ngon_ngu: "",
        trinh_do: "",
        ma_can_bo: "",
        thoi_gian: "",
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedTrinhDoNgoaiNgu: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "trinhDoNgoaiNgus",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedTrinhDoNgoaiNgu =
                action.payload !== null ? action.payload : initialState.trinhDoNgoaiNgu;
        },
        getTrinhDoNgoaiNguById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getTrinhDoNgoaiNguByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedTrinhDoNgoaiNgu = action.payload;
        },
        getTrinhDoNgoaiNguByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedTrinhDoNgoaiNgu = action.payload
                ? action.payload
                : state.trinhDoNgoaiNgu;
        },
        getTrinhDoNgoaiNgus: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getTrinhDoNgoaiNgusSuccess: (state, action) => {
            state.errorMassage = false;
            state.trinhDoNgoaiNgus = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getTrinhDoNgoaiNgusError: (state, action) => {
            state.errorMassage = "Error";
            state.trinhDoNgoaiNgus = action.payload
                ? action.payload
                : state.trinhDoNgoaiNgus;
            state.isLoading = false;
        },
        handleTrinhDoNgoaiNgu: (state, action) => {
        },
        handleTrinhDoNgoaiNguSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedTrinhDoNgoaiNgu = action.payload;
        },
        handleTrinhDoNgoaiNguError: (state, action) => {
        },
        updateSelectedTrinhDoNgoaiNguInput: (state, action) => {
            state.selectedTrinhDoNgoaiNgu = action.payload;
        },

    },
});

export default reducer;