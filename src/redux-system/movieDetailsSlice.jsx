import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getOneMovie = createAsyncThunk(`getOneMovie`, async (id, thunkAPI) => {

    const { rejectWithValue } = thunkAPI

    try {
        const theMovie = await axios({

            mmethod: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
            }

        })

        return theMovie.data


    } catch (error) {
        return rejectWithValue(error)
    }


})




const movieDetailsSlice = createSlice({

    name: "movieDetailsSlice",

    initialState: { movi: null, isLoading: true, err: null },
    extraReducers: (builder) => {

        builder.addCase(getOneMovie.pending, (state) => { state.isLoading = true });

        builder.addCase(getOneMovie.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movi = action.payload
        });

        builder.addCase(getOneMovie.rejected, (state, action) => {
            state.isLoading = false
            state.err = action.payload.message
        });


    }
});










export const myMovie = movieDetailsSlice.reducer
