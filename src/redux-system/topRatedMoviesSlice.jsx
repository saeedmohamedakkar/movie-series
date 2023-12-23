import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getTopRatedMovies = createAsyncThunk(`getTopRatedMovies`, async (a, thunkAPI) => {

    const { rejectWithValue } = thunkAPI

    try {
        const topRatedMovies = await axios({

            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/top_rated',
            params: { language: 'en-US', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
            }

        })
        return topRatedMovies.data


    } catch (topRatedMoviesError) {
        return rejectWithValue(topRatedMoviesError)
    }


})





const topRatedMoviesSlice = createSlice({
    name: "topRatedMoviesSlice",

    initialState: { allTopRatedMovies: [], topRatedMoviesError: null },

    extraReducers: (builder) => {

        builder.addCase(getTopRatedMovies.pending, (state) => { });

        builder.addCase(getTopRatedMovies.fulfilled, (state, action) => { state.allTopRatedMovies = action.payload });

        builder.addCase(getTopRatedMovies.rejected, (state, action) => { state.topRatedMoviesError = action.payload.message });


    }
});






export const topRatedMovies = topRatedMoviesSlice.reducer
