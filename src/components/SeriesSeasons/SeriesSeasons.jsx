import React from "react"
import { useSelector } from "react-redux";
import ReactLoading from 'react-loading';

function SeriesSeasons() {


    const { isLoading, oneSeriesErr, oneSeries, lastSes } = useSelector(state => state.mySeries)

    return (<>

        <div className="container my-5 d-flex justify-content-center">

            {oneSeriesErr && <h2>Error 404 !</h2>}

            {isLoading && <ReactLoading type="bubbles" color="blue" width={'10%'} height={'20%'} />}

        </div>



        <div className="container">

            <div className="row">

                {oneSeries && oneSeries.seasons.length > 0 ?

                    oneSeries.seasons.map((se) => <div className="col-lg-4" key={se.id}>

                        <img loading="lazy" className="w-50 my-3 TopRatedMoviesImages" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${se.poster_path}`} alt="not available" />

                        <p className="text-info">{se.name}</p>

                        <p> {se.episode_count ? se.episode_count : "not available"} Episodes</p>

                    </div>) : ""}

            </div>





        </div>












    </>
    );
}

export default SeriesSeasons