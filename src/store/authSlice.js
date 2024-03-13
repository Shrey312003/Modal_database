import { createSlice } from "@reduxjs/toolkit";

const State = {
    username:null
}

const initalState = State;

const authSlice = createSlice({
    name:"auth",
    initialState: initalState,

    reducers:{
        setData: (state,action)=>{
            state.username = action.payload.data;
        },
    },
});

export default authSlice;