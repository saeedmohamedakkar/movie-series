import React, { useState } from "react"
import Nav from './components/Nav/Nav';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import Movies from './components/Movies/Movies';
import Series from './components/Series/Series';
import ContactUs from './components/ContactUs/ContactUs';
import Foter from './components/Foter/Foter';
import MovieDetails from "./components/MovieDetails/MovieDetails";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import SeriesDetails from './components/SeriesDetails/SeriesDetails';
import SeriesReviews from "./components/SeriesReviews/SeriesReviews";
import SeriesSeasons from "./components/SeriesSeasons/SeriesSeasons";



const App = () => {


  let [isDark, setIsDark] = useState(true)


  function changeBg(e) {

    e.preventDefault()

    if (isDark) { setIsDark(false) }

    else { setIsDark(true) }

  }

  return (

    <div className={isDark ? "bg-black" : "bg-light min-vh-100 text-dark"} >

      <Nav changeBg={changeBg} isDark={isDark} />


      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='*' element={<Error />} />

        <Route path='/movies' element={<Movies isDark={isDark} />} />

        <Route path='/series' element={<Series isDark={isDark} />} />

        <Route path='/contactUs' element={<ContactUs isDark={isDark} />} />

        <Route path='/movieDetails/:movieId' element={<MovieDetails isDark={isDark} />} />

        <Route path='/movieReviews/:movieId' element={<MovieReviews />} />

        <Route path='/seriesDetails/:seriesId' element={<SeriesDetails />} />

        <Route path='/seriesReviews/:Id' element={<SeriesReviews />} />

        <Route path='/seriesSeasons/:Id' element={<SeriesSeasons />} />

      </Routes>

      <Foter />





    </div>
  );
}

export default App;
