import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getSeriesKeyWords = createAsyncThunk(`getSeriesKeyWords`, async (id, thunkAPI) => {

    const { rejectWithValue } = thunkAPI

    try {
        const seriesKeyWords = await axios({

            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${id}/keywords`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
            }




        })
        return seriesKeyWords.data


    } catch (seriesKeyWordsErr) {
        return rejectWithValue(seriesKeyWordsErr)
    }


})





const seriesKeyWordsSlice = createSlice({
    name: "topMoviesSlice ",

    initialState: { seriesKeyWord: null, seriesKeyWordsErr: null },

    extraReducers: (builder) => {

        builder.addCase(getSeriesKeyWords.pending, (state) => { });

        builder.addCase(getSeriesKeyWords.fulfilled, (state, action) => {

            state.seriesKeyWord = action.payload
        });

        builder.addCase(getSeriesKeyWords.rejected, (state, action) => {

            state.seriesKeyWordsErr = action.payload.message
        });


    }
});






export const seriesKeyWord = seriesKeyWordsSlice.reducer   