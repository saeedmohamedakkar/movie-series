import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getSeries = createAsyncThunk("getSeries", async (page, thunkAPI) => {

  const { rejectWithValue } = thunkAPI


  try {

    if (page < 1) { page = 1 }
    if (page > 500) { page = 500 }

    const series = await axios({



      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/tv',
      params: {
        include_adult: 'false',
        include_null_first_air_dates: 'false',
        language: 'en-US',
        page,
        sort_by: 'popularity.desc'
      },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
      }

    })


    return series.data

  } catch (seriesError) {

    return rejectWithValue(seriesError)
  }
})


const seriesSlice = createSlice({

  name: "seriesSlice",


  initialState: { allSeries: [], seriesError: null, isLoading: true },






  extraReducers: (builder) => {

    builder.addCase(getSeries.pending, (state) => { state.isLoading = true });
    builder.addCase(getSeries.fulfilled, (state, action) => {
      state.isLoading = false
      state.allSeries = action.payload
    });
    builder.addCase(getSeries.rejected, (state, action) => {
      state.isLoading = false
      state.seriesError = action.payload.message
    });
  }

})

export const series = seriesSlice.reducer

