import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getTopSeries = createAsyncThunk("getTopSeries", async (a, thunkAPI) => {

  const { rejectWithValue } = thunkAPI

  try {

    const topSeries = await axios({

      method: 'GET',
      url: 'https://api.themoviedb.org/3/tv/on_the_air',
      params: { language: 'en-US', page: '1' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
      }

    })

    return topSeries.data

  }
  catch (err) { return rejectWithValue(err) }

})


const topSeriesSlice = createSlice({

  name: "topSeriesSlice",

  initialState: { allTopSeries: [], seriesError: null },

  extraReducers: (builder) => {


    builder.addCase(getTopSeries.pending, (state) => { });
    builder.addCase(getTopSeries.fulfilled, (state, action) => { state.allTopSeries = action.payload });
    builder.addCase(getTopSeries.rejected, (state, action) => { state.seriesError = action.payload.message });
  },
})




export const topSeries = topSeriesSlice.reducer