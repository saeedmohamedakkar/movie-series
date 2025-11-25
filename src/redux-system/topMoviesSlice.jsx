import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getTopMovies = createAsyncThunk(`getTopMovies`, async (a, thunkAPI) => {

    const { rejectWithValue } = thunkAPI

    try {
        const topMovies = await axios({

            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/now_playing',
            params: { language: 'en-US', page: '1' },

            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
            }




        })
        return topMovies.data


    } catch (error) {
        return rejectWithValue(error)
    }


})





const topMoviesSlice = createSlice({
    name: "topMoviesSlice ",

    initialState: { allTopMovies: [], isLoading: true, err: null },

    extraReducers: (builder) => {

        builder.addCase(getTopMovies.pending, (state) => { state.isLoading = true });

        builder.addCase(getTopMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allTopMovies = action.payload
        });

        builder.addCase(getTopMovies.rejected, (state, action) => {
            state.isLoading = false
            state.err = action.payload.message
        });


    }
});






export const topMovies = topMoviesSlice.reducer
