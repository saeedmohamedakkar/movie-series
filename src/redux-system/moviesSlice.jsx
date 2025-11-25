import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getMovies =

  createAsyncThunk("getMovies", async (page, thunkAPI) => {

    const { rejectWithValue } = thunkAPI

    try {

      if (page < 1) { page = 1 }
      if (page > 500) { page = 500 }

      const movies = await axios({

        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
          include_adult: 'true',
          include_video: 'false',
          language: 'en-US',
          page,
          sort_by: 'popularity.desc'
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
        }

      })

      return movies.data




    } catch (movieError) {

      return rejectWithValue(movieError)
    }


  })


const moviesSlice = createSlice({

  name: "moviesSlice",


  initialState: { allMovies: [], movieError: null, isLoading: true },







  extraReducers: (builder) => {

    builder.addCase(getMovies.pending, (state) => { state.isLoading = true });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.isLoading = false
      state.allMovies = action.payload
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.isLoading = false
      state.movieError = action.payload.message

    });

  }

})

export const movies = moviesSlice.reducer

