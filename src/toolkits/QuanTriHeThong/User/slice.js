import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
  selectedUser: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedUser =
        action.payload !== null ? action.payload : initialState.user;
    },

    getUsers: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.errorMassage = false;
      state.users = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getUsersError: (state, action) => {
      state.errorMassage = "Error";
      state.users = action.payload ? action.payload : state.users;
      state.isLoading = false;
    },
    handleUser: (state, action) => {},
    handleUserSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedUser = action.payload;
    },
    handleUserError: (state, action) => {},
    updateSelectedUserInput: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export default reducer;
