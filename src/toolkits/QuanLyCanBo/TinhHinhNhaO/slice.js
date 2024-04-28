import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tinhHinhNhaOs: [],
    tinhHinhNhaO: {
        id: "",
        ma_can_bo: "",
        hinh_thuc: "",
        loai_nha: "",
        dien_tich: "",
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedTinhHinhNhaO: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "tinhHinhNhaOs",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedTinhHinhNhaO =
                action.payload !== null ? action.payload : initialState.tinhHinhNhaO;
        },
        getTinhHinhNhaOById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getTinhHinhNhaOByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedTinhHinhNhaO = action.payload;
        },
        getTinhHinhNhaOByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedTinhHinhNhaO = action.payload
                ? action.payload
                : state.tinhHinhNhaO;
        },
        getTinhHinhNhaOs: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getTinhHinhNhaOsSuccess: (state, action) => {
            state.errorMassage = false;
            state.tinhHinhNhaOs = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getTinhHinhNhaOsError: (state, action) => {
            state.errorMassage = "Error";
            state.tinhHinhNhaOs = action.payload
                ? action.payload
                : state.tinhHinhNhaOs;
            state.isLoading = false;
        },
        handleTinhHinhNhaO: (state, action) => {
        },
        handleTinhHinhNhaOSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedTinhHinhNhaO = action.payload;
        },
        handleTinhHinhNhaOError: (state, action) => {
        },
        updateSelectedTinhHinhNhaOInput: (state, action) => {
            state.selectedTinhHinhNhaO = action.payload;
        },

    },
});

export default reducer;