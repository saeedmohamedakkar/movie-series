import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";



function MovieReviews() {
  const { movieId } = useParams()
  let [reviews, setReviews] = useState([])

  let [reviewsErr, setRreviewsErr] = useState(null)
  
  useEffect(() => {
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
  }, [])


  return (<>


    <div className="container d-flex justify-content-evenly ">

      {reviewsErr && <h2>Error 404 !</h2>}

      <div className="row">
        {reviews.length > 0 ? reviews.map((rev) => <div className="col-lg-6 my-5" key={rev.id}>

          <h3>A review by <p className="text-info d-inline ">{rev.author ? rev.author : "user"}</p> </h3>
          <p>Written on <span className="text-info d-inline ">{rev.created_at}</span></p>


          <p className="text-info">content</p>



          <p className="text-secondary">{rev.content}</p>


        </div>)

          : ""}
      </div>


    </div>


  </>
  );
}

export default MovieReviews