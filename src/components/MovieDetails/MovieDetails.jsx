import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { CgPlayListCheck } from "react-icons/cg";
import { MdStarRate } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { Carousel } from 'react-responsive-carousel';
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

function MovieDetails({ isDark }) {

  const { movieId } = useParams()

  const { movi, isLoading, err } = useSelector((state) => state.myMovie)

  let [cast, setCast] = useState([])

  let [castErr, setCastErr] = useState(null)

  let [keywords, setKeywords] = useState([])

  let [keywordsError, setKeywordsError] = useState(null)

  let [reviews, setReviews] = useState([])

  let [reviewsErr, setRreviewsErr] = useState(null)

  let [collection, setCollection] = useState([])

  let [collErr, setCollErr] = useState(null)

  let [trailer, setTrailer] = useState([])


  /////////////////////////////
  // get trailer

  const moviTrailer = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
    }
  };

  fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, moviTrailer)
    .then(response => response.json())
    .then(response => setTrailer(response.results))
    .catch(err => console.log(err));



  //////////////////////////
  // get actors and Casting
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
    }
  };



  // useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
    .then(response => response.json())
    .then(response => setCast(response))
    .catch(err => setCastErr(err));
  // }, [])
  /////////////////////////////////////////////////////////////////////////////////////////////
  // get key words
  const getKeys = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
    }
  };
  // useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/keywords`, getKeys)
    .then(response => response.json())
    .then(response => setKeywords(response.keywords))
    .catch(err => setKeywordsError(err));
  // }, [])


  ///////////////////////////////////////////////////////
  // get reviews
  // useEffect(() => {
  const getReviews = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
    }
  };

  fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, getReviews)
    .then(response => response.json())
    .then(response => setReviews(response.results))
    .catch(err => setRreviewsErr(err));
  // }, [])
  ///////////////////////////////////////////////////////


  setTimeout(() => {
    // useEffect(() => {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
      }
    };

    fetch(`https://api.themoviedb.org/3/collection/${movi && movi.belongs_to_collection ? movi.belongs_to_collection.id : ""}?language=en-US`, options)
      .then(response => response.json())
      .then(response => setCollection(response))
      .catch(err => setCollErr(err));
    // }, [])
  }, 1000);



  ///////////////////////////////////////////////////////  
  return (<>


    <div className="container my-5 d-flex justify-content-center ">

      {isLoading && <ReactLoading type="bubbles" color="blue" width={'10%'} height={'20%'} />}

      {err && <h2>Error 404 !</h2>}

    </div>


    {movi ? <div className="container  ">

      <div className="row ">
        <div className="col-lg-4 ">

          <img className="w-100" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movi.poster_path}`} alt="movie" />


        </div>

        <div className="col-lg-8 ">

          <h2 className="text-info">{movi.original_title}</h2>



          <div className="d-flex my-4">
            <p className="mx-5">Release date {movi.release_date}    </p>
            <p className="mx-1 text-info"> ({movi.original_language.toUpperCase()})</p>
            <p className="mx-1">{movi.genres[0] ? movi.genres[0].name : ""}</p>
            <p className="mx-1">{movi.genres[1] ? movi.genres[1].name : ""}</p>
            <p className="mx-1">{movi.genres[2] ? movi.genres[2].name : ""}</p>
            <p className="mx-1">{movi.genres[3] ? movi.genres[3].name : ""}</p>
            <p className="text-info">{Math.round(movi.runtime / 60)}h</p>

          </div>

          <h3 className="text-info">overview</h3>
          <p> {movi.overview}</p>


          <h3 className="text-info my-5">Casting</h3>

          <div className="container my-3 ">
            <div className="row">
              <div className="col-lg-6">
                <h3 className="" >{cast.cast && cast.cast[0] ? cast.cast[0].name : ""}</h3>
                <p className="text-info">Acting</p>
              </div>
              <div className="col-lg-6">
                <h3>{cast.cast && cast.cast[1] ? cast.cast[1].name : ""}</h3>
                <p className="text-info">Acting</p>
              </div>
            </div>



          </div>


          {/* ///////////////////////////////////////////// */}

          {castErr && <h2>Error 404 !</h2>}
          <div className="container my-5 ">
            <div className="row">
              <div className="col-lg-4">
                <h3>{cast.crew && cast.crew[0] ? cast.crew[0].name : ""}</h3>
                <p className="text-info mx-auto">{cast.crew && cast.crew[0] ? cast.crew[0].department : ""}</p>
              </div>
              <div className="col-lg-4">

                <h3 >{cast.crew && cast.crew[1] ? cast.crew[1].name : ""}</h3>
                <p className="text-info mx-auto">{cast.crew && cast.crew[1] ? cast.crew[1].department : ""}</p>

              </div>
              <div className="col-lg-4">


                <h3>{cast.crew && cast.crew[2] ? cast.crew[2].name : ""}</h3>
                <p className="text-info mx-auto">{cast.crew && cast.crew[2] ? cast.crew[2].department : ""}</p>
              </div>
            </div>

          </div>

          <div className="container my-5 ">

            <div className="row">

              <div className="col-lg-4">

                <h2 className="text-success text-center"><CgPlayListCheck /></h2>
                <p className="text-center">Add to Watch List </p>


              </div>

              <div className="col-lg-4">

                <h2 className="text-warning text-center"><MdStarRate /></h2>
                <p className="text-center">Rate Movie</p>


              </div>
              <div className="col-lg-4">


                {/* ///// */}
                <div>
                  <h2 type="button" className="text-danger text-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <SiYoutubemusic />
                  </h2>

                  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">



                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer && trailer.length > 0 ? trailer[0].key : ""}?si=twsn3yqm1hIZ4-kv`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-center">Play Trailer</p>
                {/* ///// */}

              </div>


            </div>



          </div>




        </div>


        <div className="container my-5">

          <div className="row">

            <div className="col-lg-10">

              <p className="text-info">Full cast</p>

              {cast.cast ? <Carousel showThumbs={false}>
                {cast.cast.map((act) => <div key={act.id}>
                  <div className="my-4">
                    <p>{act.name}</p>
                    <p>{act.known_for_department}</p>
                    <img className="w-25 my-5" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${act.profile_path}`} alt="not available" />

                  </div>

                </div>)}
              </Carousel>
                : ""}



            </div>


            {/* ////////// */}
            <div className="col-lg-10">

              <p className="text-info my-5">Full crew</p>
              {cast.crew ? <Carousel showThumbs={false}>
                {cast.crew.map((act) => <div key={act.id}>

                  <div className="my-5">

                    <p>{act.name}</p>
                    <p>{act.job}</p>
                    <img className="w-25 my-5" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${act.profile_path}`} alt="not available" />

                  </div>

                </div>)}
              </Carousel>
                : ""}



            </div>




            <div className="col-lg-2">

              <p>Status</p>

              {movi ? <p className="text-info">{movi.status}</p> : ""}


              <p>Original language</p>

              {movi ? <p className="text-info">{movi.original_language.toUpperCase()}</p> : ""}


              <p>Budget</p>

              {movi ? <p className="text-info">{movi.budget} $</p> : ""}


              <p>Revenue</p>

              {movi ? <p className="text-info">{movi.revenue} $</p> : ""}





            </div>
            <hr className="text-info" />

            <div className="keyWordDiv my-5 ">

              <h3 className="text-info my-5">Key words</h3>
              {keywordsError && <h2>Error 404 !</h2>}

              {keywords.length > 0 ? keywords.map((key) => <p className="btn btn-secondary mx-2 " key={key.id}>{key.name}</p>) : ""}



            </div>
            <hr className="text-info" />


          </div>

          <h3 className="text-info">Social</h3>

          <p className="my-2 text-warning ">Reviews {reviews.length}</p>

          {reviews.length > 0 ? <div> <h2>A review by <span className="text-info d-inline ">{reviews[0].author ? reviews[0].author : "user"}</span> </h2>
            <p>Written on <span className="text-info d-inline ">{reviews[0].created_at}</span></p>
            <p className="text-info">content</p>
            <p className="text-secondary">{reviews[0].content ? reviews[0].content : ""}</p>

            <Link to={`/movieReviews/${movieId}`}>
              <button className="btn btn-secondary">See All Reviews<IoIosArrowRoundForward /></button>
            </Link>


          </div>
            : "No reviews for this movie"}



          <hr className="text-info" />

        </div>

        {/* media section */}

        <div className="container w-75  ">


          <h2 className="text-info">Media</h2>

          <Carousel showThumbs={false}>

            {trailer.length > 0 ? trailer.map((tr) => <iframe key={tr.id} className="my-2 mx-2 " width="560" height="315" src={`https://www.youtube.com/embed/${tr.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>) : "No Media for this movie"}

          </Carousel>

        </div>




        <div className="container">

          <div className="text-center">



            <h2 className="text-info">{movi.belongs_to_collection ? movi.belongs_to_collection.name : ""}</h2>

            {movi.belongs_to_collection && collection.parts ? collection.parts.map((coll) => <h5 key={coll.id} className="my-3 text-danger">{coll.original_title}</h5>) : ""}


          </div>


        </div>







      </div>


    </div> : isLoading}



















  </>
  );
}

export default MovieDetails




