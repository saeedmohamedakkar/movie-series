import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";




function SeriesReviews() {
    const { Id } = useParams();

    const dispatch = useDispatch();

    const { seriesReviews, seriesReviewsErr } = useSelector(state => state.seriesReviews);

    useEffect(() => {
        if (!seriesReviews && Id) {
            // dynamic require to avoid top-level import ordering issues
            const { getSeriesReviews } = require('../../redux-system/seriesReviewsSlice');
            
            dispatch(getSeriesReviews(Id))
        }
    }, [seriesReviews, Id, dispatch])



    return (<>


        <div className="container d-flex justify-content-evenly ">

            {seriesReviewsErr && <h2>Error 404 !</h2>}

            <div className="row">
                {seriesReviews ? seriesReviews.results.map((rev) => <div className="col-lg-6 my-5" key={rev.id}>

                    <h3>A review by <p className="text-info d-inline ">{rev.author ? rev.author : "user"}</p> </h3>
                    <p>Written on <p className="text-info d-inline ">{rev.created_at}</p></p>


                    <p className="text-info">content</p>



                    <p className="text-secondary">{rev.content}</p>


                </div>)

                    : ""}
            </div>


        </div>


    </>
    );
}

export default SeriesReviews