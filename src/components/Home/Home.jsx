import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getTopMovies } from './../../redux-system/topMoviesSlice';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactLoading from 'react-loading';
import { getTopSeries } from './../../redux-system/topSeriesSlice';
import { getTopRatedMovies } from './../../redux-system/topRatedMoviesSlice';
import ReactStars from "react-rating-stars-component";
import { getTopRatedSeries } from "../../redux-system/topRatedSeriesSlice";
import { Link } from 'react-router-dom';
import { getOneMovie } from './../../redux-system/movieDetailsSlice';
import { getOneSries } from "../../redux-system/SeriesDetailsSlice";

function Home() {

  const firstExample = {
    size: 20,
    count: 5,
    edit: false,
    isHalf: true,
  };



  const { allTopMovies, isLoading, err } = useSelector((state) => state.topMovies)

  const { seriesError, allTopSeries } = useSelector((state) => state.topSeries)

  const { allTopRatedMovies, topRatedMoviesError } = useSelector((state) => state.topRatedMovies)

  const { allTopRatedSeries, topRatedSeriesError } = useSelector((state) => state.topRatedSeries)


  const dispatch = useDispatch()



  useEffect(() => {
    setTimeout(() => {
      dispatch(getTopMovies())
    }, 500);
  }, [])
  /////////////////////////////////

  useEffect(() => {
    setTimeout(() => {
      dispatch(getTopSeries())
    }, 500);
  }, [])
  /////////////////////////////////

  useEffect(() => {
    setTimeout(() => {
      dispatch(getTopRatedMovies())
    }, 500);
  }, [])
  ////////////////////////////////////
  useEffect(() => {
    setTimeout(() => {
      dispatch(getTopRatedSeries())
    }, 500);
  }, [])


  return (<>

    {/* //top 20 movie//// */}

    <div className="container my-5 d-flex justify-content-center">
      {isLoading && <ReactLoading type="bubbles" color="blue" width={'10%'} height={'20%'} />}

      {err && <h2>Error 404 !</h2>}
    </div>


    <h2 className="mx-5 text-info mb-3">Top 20 Movies</h2>


    <div className="container my-5 ">
      {allTopMovies.results ? <Carousel showThumbs={false}>
        {allTopMovies.results.map((movie) => < div key={movie.id}>
          <Link onClick={() => dispatch(getOneMovie(movie.id))} to={`/movieDetails/${movie.id}`}>
            <div className="my-5">

              <img loading="lazy" className="w-25" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt="movie" />

            </div>
          </Link>
        </div>)}
      </Carousel>


        : ""}
    </div>

    {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


    {/* //top 20 Serieses//// */}

    {seriesError && <h2>Error 404 !</h2>}


    <h2 className="mx-5 text-info mb-3">Top 20 Serieses</h2>

    <div className="container my-5 ">
      {allTopSeries.results ? <Carousel showThumbs={false}>
        {allTopSeries.results.map((series) => < div key={series.id}>
          <Link onClick={() => dispatch(getOneSries(series.id))} to={`/seriesDetails/${series.id}`}>
            <div className="my-5">
              <img loading="lazy" className="w-25" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${series.poster_path}`} alt="series" />
            </div>
          </Link>
        </div>)}
      </Carousel>


        : ""}
    </div>



    {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


    {/* //top rated movies//// */}

    {topRatedMoviesError && <h2>Error 404 !</h2>}


    <h2 className="mx-5 text-info mb-3">Top IMDB Movies</h2>

    <div className="container my-5 justify-content-evenly  ">

      {allTopRatedMovies.results ? <div>

        <div className="row">

          {allTopRatedMovies.results.map((movie) =>


            <div key={movie.id} className="col-lg-4 text-center my-5 ">
              <Link onClick={() => dispatch(getOneMovie(movie.id))} to={`/movieDetails/${movie.id}`}>
                <img loading="lazy" className="TopRatedMoviesImages w-50 my-1" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt="movie" />
              </Link>
              <p className="my-1">{movie.title}</p>


              <div className="d-flex justify-content-center">
                <p className="my-1 mx-4 text-info">Rate {movie.vote_average / 2}</p>
                <ReactStars value={movie.vote_average / 2}{...firstExample} />

              </div>


            </div>

          )}
        </div>


      </div>



        : ""}
    </div>

    <hr className="text-info" />

    {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


    {/* //top rated Serieses//// */}


    {topRatedSeriesError && <h2>Error 404 !</h2>}


    <h2 className="mx-5 text-info mb-3">Top IMDB Serieses</h2>

    <div className="container my-5 justify-content-evenly  ">

      {allTopRatedSeries.results ? <div>

        <div className="row">

          {allTopRatedSeries.results.map((series) =>


            <div key={series.id} className="col-lg-4 text-center my-5 ">
              <Link onClick={() => dispatch(getOneSries(series.id))} to={`/seriesDetails/${series.id}`}>
                <img loading="lazy" className="TopRatedMoviesImages w-50 my-1" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${series.poster_path}`} alt="Series" />
              </Link>
              <p className="my-1">{series.name}</p>




              <div className="d-flex justify-content-center">
                <p className="my-2 text-info mx-4 ">Rate {series.vote_average / 2}</p>
                <ReactStars value={series.vote_average / 2}{...firstExample} />

              </div>


            </div>

          )}
        </div>


      </div>



        : ""}
    </div>
















  </>
  );
}

export default Home
