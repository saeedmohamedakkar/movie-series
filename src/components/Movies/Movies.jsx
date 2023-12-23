import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import ReactStars from "react-rating-stars-component";
import { getMovies } from './../../redux-system/moviesSlice';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { IoIosArrowRoundBack } from 'react-icons/io';
import ShowMore from 'react-show-more-button';
import { Link } from 'react-router-dom';
import { getOneMovie } from './../../redux-system/movieDetailsSlice';


function Movies({ isDark }) {

  const firstExample = {
    size: 20,
    count: 5,
    edit: false,
    isHalf: true,
  };

  const { allMovies, movieError, isLoading } = useSelector((state) => state.movies)

  const dispatch = useDispatch()


  useEffect(() => {
    setTimeout(() => {
      dispatch(getMovies(1))
    }, 500);
  }, [])

  ////////////////////////////////////////////////////////
  return (<>


    <div className="container my-5 d-flex justify-content-center">
      {isLoading && <ReactLoading type="bubbles" color="blue" width={'10%'} height={'20%'} />}

      {movieError && <h2>Error 404 !</h2>}
    </div>


    <h2 className="mx-5 text-info mb-3">Movies</h2>

    <h3 className="text-center">page <p className="text-info d-inline">{allMovies.page}</p> of <p className="text-info d-inline">500</p></h3>

    <div className="container my-5 justify-content-evenly  ">

      {allMovies.results ? <div>

        <div className="row">

          {allMovies.results.map((movie) =>


            <div key={movie.id} className="col-lg-4 text-center my-5 ">
              <Link to={`/movieDetails/${movie.id}`} >
                <img onClick={() => dispatch(getOneMovie(movie.id))} loading="lazy" className="TopRatedMoviesImages w-50 my-1" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt="movie" />
              </Link>
              <p className="my-2">{movie.title}</p>


              <ShowMore className={isDark ? "bg-black text-secondary" : "bg-light text-dark"} maxHeight={62} button={<button type="button" className="btn btn-dark">movie  details </button>}>

                <p> {movie.overview} </p>


              </ShowMore>

              <div className="d-flex justify-content-center">

                <p className="my-1 text-info mx-4">Rate {movie.vote_average / 2}</p>

                <ReactStars value={movie.vote_average / 2}{...firstExample} />

              </div>


            </div>

          )}
        </div>


        <div className="text-center w-100 d-flex justify-content-center">


          <nav aria-label="...">

            <ul className="pagination">

              <li className="page-item ">
                <button onClick={() => dispatch(getMovies(allMovies.page - 1))} className="page-link" ><IoIosArrowRoundBack />Previous</button>
              </li>


              {[-2, -1, 0, 1, 2].map((num) => {
                const page = allMovies.page + num;

                if (page < 1) return
                if (page > 500) return
                return <li className="page-item" key={num}>
                  < button onClick={() => dispatch(getMovies(page))} className={num === 0 ? 'active page-link ' : 'page-link'}>{page}</button>
                </li>
              })
              }



              <li className="page-item">
                <button onClick={() => dispatch(getMovies(allMovies.page + 1))} className="page-link">Next<MdOutlineNavigateNext /></button>
              </li>
            </ul>
          </nav>




        </div>

      </div>
        : ""}

      <div className="text-center my-5">
        <h6 className="text-center my-2 ">page <p className="text-info d-inline my-2 ">{allMovies.page}</p> of <p className="text-info d-inline">500</p></h6>

      </div>




    </div>


  </>
  );
}

export default Movies
