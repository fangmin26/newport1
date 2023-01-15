import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../common/Data/api";

const initialState = {
  status:null,
  postingList:null,
  subjectList:null,
  postingIdList:null,
  postingId:0
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
    console.log(param)
    const res = await api.get("posting/postingById/"+param);
    console.log(res)
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
    statePostingId:(state,action)=> {
      state.postingId = action.payload;
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getAllPosting.fulfilled,(state,action)=>{
      state.status = "success"
      state.postingList = action.payload.postingList
    })
    builder.addCase(postingSearch.fulfilled,(state,action)=>{
      state.status = "success"
      state.postingList = action.payload.postingList
    })
    builder.addCase(subjectSearch.fulfilled,(state,action)=>{
      state.status = "success"
      state.postingList = action.payload.postingList
    })
    builder.addCase(getPostingId.fulfilled,(state,action)=>{
      state.status = "success"
      state.postingIdList = action.payload.postingList
    })
    builder.addCase(getAllSubject.fulfilled,(state,action)=>{
      state.status = "success"
      state.subjectList = action.payload.subjectList
    })

  }
});
export const { changeFirstLb, changeSecondLb, statePostingId } = otherSlice.actions;

export default otherSlice.reducer;
