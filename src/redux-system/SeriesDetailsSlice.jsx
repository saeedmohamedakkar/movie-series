import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getOneSries = createAsyncThunk("getOneSries", async (id, thunkAPI) => {

    const { rejectWithValue } = thunkAPI

    try {

        const oneSeries = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${id}`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
            }


        })


        return oneSeries.data


    }

    catch (error) {
        return rejectWithValue(error)
    }


})

const oneSeriesSlice = createSlice({

    name: "oneSeriesSlice",

    initialState: { isLoading: true, oneSeriesErr: null, oneSeries: null, lastSes: null },

    extraReducers: (builder) => {

        builder.addCase(getOneSries.pending, (state) => { state.isLoading = true });

        builder.addCase(getOneSries.fulfilled, (state, action) => {
            state.isLoading = false
            state.oneSeries = action.payload
        });

        builder.addCase(getOneSries.rejected, (state, action) => {
            state.isLoading = false
            state.oneSeriesErr = action.payload.message
        });
    },

})


export const mySeries = oneSeriesSlice.reducer

