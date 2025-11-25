import React, { useState } from "react"
import { Link } from "react-router-dom";
import { BiSolidCameraMovie } from 'react-icons/bi';
import { BsMoonStars } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { getOneSries } from "../../redux-system/SeriesDetailsSlice";
import { getOneMovie } from './../../redux-system/movieDetailsSlice';
import { getSeriesReviews } from "../../redux-system/seriesReviewsSlice";
import { getSeriesKeyWords } from "../../redux-system/seriesKeyWordsSlice";
import { getSriesCast } from "../../redux-system/seriesCastSlice";
import { TbSearch } from "react-icons/tb";




function Nav({ changeBg, isDark }) {

  let [isMovie, setIsMovie] = useState(true)

  let [searchValue, setSearchValue] = useState("")

  let [mySearchValue, setMySearchValue] = useState([])

  const dispatch = useDispatch()


  ///////////////////////////////////////////////////////
  // handle movie Search

  function movieSearch() {


    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: { query: `${searchValue}`, include_adult: 'false', language: 'en-US', page: '1' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setMySearchValue(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });




  }
  //////////////////////////////////////////////////////
  function itIsMovie(e) {
    e.preventDefault()
    setIsMovie(true)
  }
  //////////////////////////////////////////////////////
  function itIsSeries(e) {
    e.preventDefault()
    setIsMovie(false)
  }
  ///////////////////////////////////////////////////////
  // handle series Search

  function seriesSearch() {

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/tv',
      params: { query: `${searchValue}`, include_adult: 'false', language: 'en-US', page: '1' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setMySearchValue(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  return (<>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-relative">
      <div className="container-fluid">
        <h3 className="navbar-brand mx-2 text-warning">Movies < BiSolidCameraMovie /> </h3>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse text-center " id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/series">Series</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactUs">Contact Us</Link>
            </li>

            <form className="d-flex mx-5">



              <li className="nav-item">
                <input onKeyUp={(e) => isMovie ? movieSearch() : seriesSearch()} onChange={(e) => setSearchValue(e.target.value)} className="form-control me-2" type="search" placeholder={isMovie ? "Search Movies" : "Search Series"} aria-label="Search" />
              </li><li className="nav-item">
                <button onClick={(e) => itIsMovie(e)} className={isMovie ? "btn btn-success mx-2" : "btn btn-outline-success mx-2"} type="submit">Search Movies <TbSearch className=" text-white" /></button>
              </li><li className="nav-item">
                <button onClick={(e) => itIsSeries(e)} className={isMovie ? "btn btn-outline-info" : "btn btn-info"} type="submit">Search Series <TbSearch className=" text-info" /></button>
              </li>
              <li className="nav-item">
                <button onClick={(e) => changeBg(e)} className={isDark ? "mx-3 btn btn-dark text-info" : "mx-3 btn btn-dark text-warning"}>{isDark ? <BsMoonStars /> : <BsSun />}</button>
              </li>

            </form>


            {/* ////////////////////////////////////////////////////////// */}

            {searchValue.length > 0 && (
              <div
                className="search-dropdown position-absolute bg-dark text-light rounded shadow-lg p-3"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  overflowY: "auto",
                  zIndex: 9999,
                  top: "110%",
                  left: 0,
                  animation: "fadeIn 0.2s ease-in-out"
                }}
              >
                {mySearchValue.map((item, index) => (
                  <Link
                    key={index}
                    className="text-decoration-none"
                    to={isMovie ? `/movieDetails/${item.id}` : `/seriesDetails/${item.id}`}
                    onClick={() => {
                      if (isMovie) {
                        dispatch(getOneMovie(item.id));
                      } else {
                        dispatch(getSeriesKeyWords(item.id));
                        dispatch(getSriesCast(item.id));
                        dispatch(getSeriesReviews(item.id));
                        dispatch(getOneSries(item.id));
                      }
                    }}
                  >
                    <p className="dropdown-item-custom">
                      {isMovie ? item.original_title : item.name}
                    </p>
                  </Link>
                ))}
              </div>
            )}




















            {/* ///////////////////////////////////////////// */}
          </ul>


        </div>
      </div>

    </nav>

  </>
  );
}

export default Nav



