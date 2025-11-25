import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getTopRatedSeries = createAsyncThunk("getTopRatedSeries", async (a, thunkAPI) => {


  const { rejectWithValue } = thunkAPI


  try {

    const topRatedSeries = await axios({

      method: 'GET',
      url: 'https://api.themoviedb.org/3/tv/top_rated',
      params: { language: 'en-US', page: '1' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
      }

    })

    return topRatedSeries.data



  } catch (topRatedSeriesError) {
    return rejectWithValue(topRatedSeriesError)
  }

})


const topRatedSeriesSlice = createSlice({

  name: "topRatedSeriesSlice",


  initialState: { allTopRatedSeries: [], topRatedSeriesError: null },

  extraReducers: (builder) => {

    builder.addCase(getTopRatedSeries.pending, (state) => { });

    builder.addCase(getTopRatedSeries.fulfilled, (state, action) => { state.allTopRatedSeries = action.payload });

    builder.addCase(getTopRatedSeries.rejected, (state, action) => { state.topRatedSeriesError = action.payload.message });

  }

})


export const topRatedSeries = topRatedSeriesSlice.reducer