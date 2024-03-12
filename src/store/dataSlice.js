import { createSlice } from "@reduxjs/toolkit";

const State = {
    modals:null
}

const initalState = State;

const dataSlice = createSlice({
    name:"modal",
    initialState: initalState,

    reducers:{
        setData: (state,action)=>{
            state.modals = action.payload.data;
        },
    },
});

export default dataSlice;