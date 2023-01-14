import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../common/Data/api";

const initialState = {
  status:null,
  postingList:null,
  subjectList:null,
  postingIdList:null,
};

export const postingAdd = createAsyncThunk(
  "postingAdd",
  async (param) => {
    const res = await api.post("posting/add", param);
    return res;
  }
);
export const subjectAdd = createAsyncThunk(
  "subjectAdd",
  async (param) => {
    console.log(param,"")
    const res = await api.post("subject/add", param);
    return res;
  }
);


export const getAllPosting = createAsyncThunk(
  "getAllPosting",
  async () => {
    const res = await api.get("posting/all");
    return res.data;
  }
);

export const postingSearch = createAsyncThunk(
  "postingSearch",
  async (param) => {
    const res = await api.post("posting/search", param);
    return res.data;
  }
);

export const subjectSearch = createAsyncThunk(
  "subjectSearch",
  async (param) => {
    const res = await api.post("posting/searchSubject", param);
    return res.data;
  }
);

export const getPostingId = createAsyncThunk(
  "getPostingId",
  async (param) => {
    const res = await api.get("posting/postingById/"+param);
    return res.data;
  }
);



export const getAllSubject = createAsyncThunk(
  "getAllSubject",
  async () => {
    const res = await api.get("subject/all");
    return res.data;
  }
);
const otherSlice = createSlice({
  name: "otherSlice",
  initialState: initialState,
  reducers: {
    changeFirstLb: (state, action) => {
      state.firstLabel = action.payload;
    },
    changeSecondLb: (state, action) => {
      state.secondLabel = action.payload;
    },
  },
  extraReducers:{
    [getAllPosting.fulfilled]:(state,action) =>{
      state.status = "success"
      state.postingList = action.payload.postingList
    },
    [getAllPosting.pending]:(state) =>{
      state.status = "pending"
    },
    [getAllPosting.rejected]:(state) =>{
      state.status = "rejected"
    },
    [postingSearch.fulfilled]:(state,action) =>{
      state.status = "success"
      state.postingList = action.payload.postingList
    },
    [postingSearch.pending]:(state) =>{
      state.status = "pending"
    },
    [postingSearch.rejected]:(state) =>{
      state.status = "rejected"
    },
    [subjectSearch.fulfilled]:(state,action) =>{
      state.status = "success"
      state.postingList = action.payload.postingList
    },
    [subjectSearch.pending]:(state) =>{
      state.status = "pending"
    },
    [subjectSearch.rejected]:(state) =>{
      state.status = "rejected"
    },
    [getPostingId.fulfilled]:(state,action) =>{
      state.status = "success"
      state.postingIdList = action.payload.postingList
    },
    [getPostingId.pending]:(state) =>{
      state.status = "pending"
    },
    [getPostingId.rejected]:(state) =>{
      state.status = "rejected"
    },
    [getAllSubject.fulfilled]:(state,action) =>{
      state.status = "success"
      state.subjectList = action.payload.subjectList
    },
    [getAllSubject.pending]:(state) =>{
      state.status = "pending"
    },
    [getAllSubject.rejected]:(state) =>{
      state.status = "rejected"
    },
  }
});
export const { changeFirstLb, changeSecondLb } = otherSlice.actions;

export default otherSlice.reducer;
