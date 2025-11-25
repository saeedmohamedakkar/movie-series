import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getSriesCast = createAsyncThunk("getSriesCast", async (id, thunkAPI) => {

    const { rejectWithValue } = thunkAPI

    try {

        const seriesCast = await axios({

            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${id}/credits`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
            }

        })


        return seriesCast.data


    }

    catch (error) {
        return rejectWithValue(error)
    }


})

const seriesCastSlice = createSlice({

    name: "seriesCastSlice",

    initialState: { seriesCastErr: null, seriesCast: null },

    extraReducers: (builder) => {

        builder.addCase(getSriesCast.pending, (state) => { });

        builder.addCase(getSriesCast.fulfilled, (state, action) => {

            state.seriesCast = action.payload
        });

        builder.addCase(getSriesCast.rejected, (state, action) => {

            state.seriesCastErr = action.payload.message
        });
    }

})


export const mySeriesCast = seriesCastSlice.reducer