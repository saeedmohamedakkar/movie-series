import React from "react"
import { useSelector } from "react-redux";




function SeriesReviews() {





    const { seriesReviews, seriesReviewsErr } = useSelector(state => state.seriesReviews)

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