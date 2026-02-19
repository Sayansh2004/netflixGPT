import { createSlice } from "@reduxjs/toolkit";


const gptSlice=createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        gptMovies:[]
    },
    reducers:{
        toggleSearchView:(state,action)=>{
         state.showGptSearch=!state.showGptSearch;
        },
        addGptMovieResult:(state,action)=>{
          state.gptMovies=action.payload;
        }
    }
})

export const {toggleSearchView,addGptMovieResult}=gptSlice.actions;
export default gptSlice.reducer;