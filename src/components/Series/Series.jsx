import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import ReactStars from "react-rating-stars-component";
import { getSeries } from './../../redux-system/seriesSlice';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { IoIosArrowRoundBack } from 'react-icons/io';
import ShowMore from 'react-show-more-button';
import { Link } from 'react-router-dom';
import { getOneSries } from "../../redux-system/SeriesDetailsSlice";

function Series({ isDark }) {

  const firstExample = {
    size: 20,
    count: 5,
    edit: false,
    isHalf: true,
  };

  const { allSeries, seriesError, isLoading } = useSelector((state) => state.series)

  const dispatch = useDispatch()



  useEffect(() => {
    setTimeout(() => {
      dispatch(getSeries(1))
    }, 500);
  }, [])

  //////////////////////////////////

  return (<>

    <div className="container my-5 d-flex justify-content-center">
      {isLoading && <ReactLoading type="bubbles" color="blue" width={'10%'} height={'20%'} />}

      {seriesError && <h2>Error 404 !</h2>}
    </div>


    <h2 className="mx-5 text-info mb-3">Series</h2>

    <h3 className="text-center">page <p className="text-info d-inline">{allSeries.page}</p> of <p className="text-info d-inline">500</p></h3>

    <div className="container my-5 justify-content-evenly  ">

      {allSeries.results ? <div>

        <div className="row">

          {allSeries.results.map((series) =>


            <div key={series.id} className="col-lg-4 text-center my-5 ">
              <Link onClick={() => dispatch(getOneSries(series.id))} to={`/seriesDetails/${series.id}`}>
                <img loading="lazy" className="TopRatedMoviesImages w-50 my-1" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${series.poster_path}`} alt="series" />
              </Link>
              <p className="my-2">{series.name}</p>


              <ShowMore className={isDark ? "bg-black text-secondary" : "bg-light text-dark"} maxHeight={62} button={<button className="btn btn-dark">series details</button>}>

                <p> {series.overview} </p>


              </ShowMore>

              <div className="d-flex justify-content-center">

                <p className="my-1 text-info mx-4">Rate {series.vote_average / 2}</p>

                <ReactStars value={series.vote_average / 2}{...firstExample} />

              </div>


            </div>

          )}
        </div>


        <div className="text-center w-100 d-flex justify-content-center">


          <nav aria-label="...">

            <ul className="pagination">

              <li className="page-item ">
                <button onClick={() => dispatch(getSeries(allSeries.page - 1))} className="page-link" ><IoIosArrowRoundBack />Previous</button>
              </li>


              {[-2, -1, 0, 1, 2].map((num) => {
                const page = allSeries.page + num;

                if (page < 1) return
                if (page > 500) return
                return <li className="page-item" key={num}>
                  < button onClick={() => dispatch(getSeries(page))} className={num === 0 ? 'active page-link ' : 'page-link'}>{page}</button>
                </li>
              })
              }



              <li className="page-item">
                <button onClick={() => dispatch(getSeries(allSeries.page + 1))} className="page-link">Next<MdOutlineNavigateNext /></button>
              </li>
            </ul>
          </nav>




        </div>


      </div>
        : ""}

      <div className="text-center my-5">
        <h6 className="text-center my-2 ">page <p className="text-info d-inline my-2 ">{allSeries.page}</p> of <p className="text-info d-inline">500</p></h6>

      </div>


    </div>



  </>
  );
}

export default Series
