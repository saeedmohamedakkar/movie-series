import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getSeriesReviews = createAsyncThunk(`getSeriesReviews`, async (id, thunkAPI) => {

    const { rejectWithValue } = thunkAPI

    try {
        const seriesRev = await axios({

            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${id}/reviews`,
            params: { language: 'en-US', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
            }




        })
        return seriesRev.data


    } catch (err) {
        return rejectWithValue(err)
    }


})





const seriesReviewsSlice = createSlice({
    name: "seriesReviewsSlice",

    initialState: { seriesReviews: null, seriesReviewsErr: null },

    extraReducers: (builder) => {

        builder.addCase(getSeriesReviews.pending, (state) => { });

        builder.addCase(getSeriesReviews.fulfilled, (state, action) => {

            state.seriesReviews = action.payload
        });

        builder.addCase(getSeriesReviews.rejected, (state, action) => {

            state.seriesReviewsErr = action.payload.message
        });


    }
});






export const seriesReviews = seriesReviewsSlice.reducer   