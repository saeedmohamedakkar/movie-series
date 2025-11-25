import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from 'react-loading';
import { Link, useParams } from "react-router-dom";
import { getSriesCast } from "../../redux-system/seriesCastSlice";
import { CgPlayListCheck } from "react-icons/cg";
import { MdStarRate } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { Carousel } from 'react-responsive-carousel';
import { getSeriesKeyWords } from "../../redux-system/seriesKeyWordsSlice";
import { getSeriesReviews } from "../../redux-system/seriesReviewsSlice";
import { IoIosArrowRoundForward } from "react-icons/io";
import axios from "axios";
function SeriesDetails() {

  const { seriesId } = useParams()

  const dispatch = useDispatch()

  const { isLoading, oneSeriesErr, oneSeries, lastSes } = useSelector(state => state.mySeries)

  const { seriesCastErr, seriesCast } = useSelector(state => state.mySeriesCast)

  const { seriesKeyWord, seriesKeyWordsErr } = useSelector(state => state.seriesKeyWord)

  const { seriesReviews, seriesReviewsErr } = useSelector(state => state.seriesReviews)

  let [trailer, setTrailer] = useState([])

  useEffect(() => {
    dispatch(getSriesCast(seriesId))
  }, [])

  useEffect(() => {
    dispatch(getSeriesKeyWords(seriesId))
  }, [])

  useEffect(() => {
    dispatch(getSeriesReviews(seriesId))
  }, [])


  /////////////////////////////
  // get series trailer
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${seriesId}/videos`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzY3M2IyOTI5MDc5YmJmMWQwOTgxMmEzMWMzMzhkZiIsInN1YiI6IjY1NGMyZTYzZmQ0ZjgwMDBlNDgxZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R8E56ngjOiQMKmlAO8SDEoEl7sq6aKciKIIk34Mop7A'
    }
  };

  axios
    .request(options)
    .then(function (response) {
      setTrailer(response.data.results);
    })
    .catch(function (error) {
      // console.error(error);
    });
  ////////////////////////////

  return (<>

    <div className="container my-5 d-flex justify-content-center">

      {isLoading && <ReactLoading type="bubbles" color="blue" width={'10%'} height={'20%'} />}

      {oneSeriesErr && <h2>Error 404 !</h2>}
    </div>
    {/* ///////////////////////////////////////////////////// */}


    {oneSeries ? <div className="container">

      <div className="row">

        <div className="col-lg-4">
          <img className="w-100" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${oneSeries.poster_path}`} alt="series" />
        </div>

        <div className="col-lg-8">

          <h2 className="text-info">{oneSeries.original_name}</h2>
          <div className="d-flex my-4">
            <p>Release date {oneSeries.first_air_date}    </p>
            <p className="mx-1 text-info"> ({oneSeries.original_language.toUpperCase()})</p>
            <p className="mx-1">{oneSeries && oneSeries.genres.length > 0 ? oneSeries.genres[0].name : ""}</p>
            <p className="mx-1">{oneSeries && oneSeries.genres.length > 0 && oneSeries.genres[1] ? oneSeries.genres[1].name : ""}</p>
            <p className="mx-1">{oneSeries && oneSeries.genres.length > 0 && oneSeries.genres[2] ? oneSeries.genres[2].name : ""}</p>
            <p className="mx-1">{oneSeries && oneSeries.genres.length > 0 && oneSeries.genres[3] ? oneSeries.genres[3].name : ""}</p>
            <p className="text-info">  {oneSeries.episode_run_time.length > 0 ? oneSeries.episode_run_time : "30"} min</p>

          </div>
          <h3 className="text-info">overview</h3>
          <p> {oneSeries.overview}</p>

          <h3 className="text-info my-5">Casting</h3>

          <div className="container my-3 ">
            <div className="row">
              <div className="col-lg-6">
                <h3 className="" >{seriesCast && seriesCast.cast.length > 0 && seriesCast.cast[0] ? seriesCast.cast[0].name : ""}</h3>
                <p className="text-info">Acting</p>
              </div>
              <div className="col-lg-6">
                <h3>{seriesCast && seriesCast.cast.length > 0 && seriesCast.cast[1] ? seriesCast.cast[1].name : ""}</h3>
                <p className="text-info">Acting</p>
              </div>
            </div>

          </div>
          {/* /////////////////////////////////////// */}
          <div className="container my-5 ">
            <div className="row">
              <div className="col-lg-4">
                <h3>{seriesCast && seriesCast.crew.length > 0 && seriesCast.crew[0] ? seriesCast.crew[0].name : ""}</h3>
                <p className="text-info mx-auto">{seriesCast && seriesCast.crew.length > 0 && seriesCast.crew[0] ? seriesCast.crew[0].department : ""}</p>
              </div>
              <div className="col-lg-4">

                <h3 >{seriesCast && seriesCast.crew.length > 0 && seriesCast.crew[1] ? seriesCast.crew[1].name : ""}</h3>
                <p className="text-info mx-auto">{seriesCast && seriesCast.crew.length > 0 && seriesCast.crew[1] ? seriesCast.crew[1].department : ""}</p>

              </div>
              <div className="col-lg-4">


                <h3>{seriesCast && seriesCast.crew.length > 0 && seriesCast.crew[2] ? seriesCast.crew[2].name : ""}</h3>
                <p className="text-info mx-auto">{seriesCast && seriesCast.crew.length > 0 && seriesCast.crew[2] ? seriesCast.crew[2].department : ""}</p>
              </div>
            </div>

          </div>
          {/* /////////////////////// */}
          <div className="row ">

            <div className="col-lg-4">

              <h2 className="text-success text-center"><CgPlayListCheck /></h2>
              <p className="text-center">Add to Watch List </p>


            </div>

            <div className="col-lg-4">

              <h2 className="text-warning text-center"><MdStarRate /></h2>
              <p className="text-center">Rate Movie</p>


            </div>

            <div className="col-lg-4">




              <div>
                <h2 type="button" className="text-danger text-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <SiYoutubemusic />
                </h2>

                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">



                      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer.length > 0 ? trailer[0].key : ""}?si=twsn3yqm1hIZ4-kv`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center">Play Trailer</p>
            </div>

          </div>
          {/* // */}


        </div>


      </div>


    </div> : ""}


    {/* ////////////////////////// */}
    <div className="container my-5   ">

      <div className="row">


        <div className="col-lg-10 my-5 ">
          <p className="text-info ">Full cast</p>

          {seriesCast && seriesCast.cast.length > 0 ? <Carousel showThumbs={false}>
            {seriesCast.cast.map((act) => <div key={act.id}>
              <div className="my-2">
                <p>{act.name}</p>
                <p className="text-info">{act.known_for_department}</p>
                <img className="w-25 my-5" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${act.profile_path}`} alt="not available" />

              </div>

            </div>)}
          </Carousel>
            : "not available"}


        </div>



        <div className="col-lg-9  ">

          <p className="text-info my-5">Full crew</p>
          {seriesCast && seriesCast.crew && seriesCast.crew.length > 0 ? <Carousel showThumbs={false}>
            {seriesCast.crew.map((act) => <div key={act.id}>
              <div className="my-5">
                <p>{act.name}</p>
                <p className="text-info">{act.job}</p>
                <img className="w-25 my-5" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${act.profile_path}`} alt="not available" />

              </div>

            </div>)}
          </Carousel>
            : "not available"}



        </div>


        <div className="col-lg-3  text-center">
          <p>original Name</p>

          {oneSeries ? <p className="text-info">{oneSeries.original_name}</p> : "not available"}

          <p>Status</p>

          {oneSeries ? <p className="text-info">{oneSeries.status}</p> : "not available"}

          <p>Type</p>

          {oneSeries ? <p className="text-info">{oneSeries.type}</p> : "not available"}

          <p>Original language</p>

          {oneSeries ? <p className="text-info">({oneSeries.original_language.toUpperCase()})</p> : "not available"}


          <p>Number of seasons</p>

          {oneSeries ? <p className="text-info">{oneSeries.number_of_seasons}</p> : "not available"}


          <p>Number of episodes</p>

          {oneSeries ? <p className="text-info">{oneSeries.number_of_episodes}</p> : "not available"}




        </div>

      </div>

    </div>



    {/* /////////////////////////////// */}
    <hr className="text-info" />
    <div className="container my-5">

      <h3 className="text-info my-5">Key words</h3>

      {seriesKeyWordsErr && <h2>Error 404 !</h2>}

      {seriesKeyWord && seriesKeyWord.results.length > 0 ? seriesKeyWord.results.map((key) => <p className="btn btn-secondary mx-2 " key={key.id}>{key.name}</p>) : "not available"}



    </div>

    <hr className="text-info" />
    <div className="container justify-content-evenly ">

      <h3 className="text-info my-5">Last Season</h3>

      <h5 className="text-warning">season {oneSeries ? oneSeries.number_of_seasons : ""} </h5>

      <Link to={`/seriesSeasons/${oneSeries ? oneSeries.id : ""}`}>

        {oneSeries && oneSeries.seasons.length > 0 ? <button className="btn btn-secondary my-2">see all seasons<IoIosArrowRoundForward className="text-info" /></button> : ""}

      </Link>




    </div>

    <hr className="text-info" />



    <div className="container">

      <h3 className="text-info">Social</h3>

      <p className="text-warning">Reviews ({seriesReviews ? seriesReviews.results.length : ""})</p>

      {seriesReviews && seriesReviews.results.length > 0 ? <div> <h2>A review by <p className="text-info d-inline ">{seriesReviews.results[0].author ? seriesReviews.results[0].author : "user"}</p> </h2>
        <p>Written on <p className="text-info d-inline ">{seriesReviews.results[0].created_at}</p></p>
        <p className="text-info">content</p>
        <p className="text-secondary">{seriesReviews.results[0].content ? seriesReviews.results[0].content : ""}</p>

        <Link to={`/seriesReviews/${seriesId}`}>
          <button className="btn btn-secondary">See All Reviews<IoIosArrowRoundForward className="text-info" /></button>
        </Link>


      </div>
        : "No reviews for this series"}

    </div>

    {/* //////////////////// */}



    <div className={trailer.length > 0 ? "container d-block  my-5  " : "d-none"} >

      <h2 className="text-info">Media</h2>


      <Carousel showThumbs={false}>

        {trailer.length > 0 ? trailer.map((tr) => <iframe key={tr.id} className="my-2 mx-2 " width="560" height="315" src={`https://www.youtube.com/embed/${tr.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>) : ""}

      </Carousel>






    </div>













  </>
  );
}

export default SeriesDetails