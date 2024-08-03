import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  group: {},
  selectedGroup: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "groups",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedGroup =
        action.payload !== null ? action.payload : initialState.group;
    },

    getGroups: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getGroupsSuccess: (state, action) => {
      state.errorMassage = false;
      state.groups = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getGroupsError: (state, action) => {
      state.errorMassage = "Error";
      state.groups = action.payload ? action.payload : state.groups;
      state.isLoading = false;
    },
    handleGroup: (state, action) => {},
    handleGroupSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedGroup = action.payload;
    },
    handleGroupError: (state, action) => {},
    updateSelectedGroupInput: (state, action) => {
      state.selectedGroup = action.payload;
    },
  },
});

export default reducer;
