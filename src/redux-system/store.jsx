import { configureStore } from "@reduxjs/toolkit";
import { topMovies } from './topMoviesSlice';
import { topSeries } from './topSeriesSlice';
import { topRatedMovies } from './topRatedMoviesSlice';
import { topRatedSeries } from "./topRatedSeriesSlice";
import { movies } from "./moviesSlice";
import { series } from "./seriesSlice";
import { myMovie } from './movieDetailsSlice';
import { mySeries } from "./SeriesDetailsSlice";
import { mySeriesCast } from "./seriesCastSlice";
import { seriesKeyWord } from "./seriesKeyWordsSlice";
import { seriesReviews } from "./seriesReviewsSlice";





  

const store = configureStore({ 
reducer:{topMovies,topSeries,topRatedMovies,topRatedSeries,movies,series,myMovie,mySeries,mySeriesCast,seriesKeyWord,seriesReviews},

});



export default store