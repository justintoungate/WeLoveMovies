const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");

   const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
  });

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}


async function getTheatersShowingMovie(movie_id) {
  return db("movies as m")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .join("theaters as t", "mt.theater_id", "t.theater_id")
  .select("t.name")
  .where({ "m.movie_id": movie_id });
}

async function getReviewsForMovie(movie_id) {
  return db("movies as m")
  .join("reviews as r", "m.movie_id", "r.movie_id")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .select("m.movie_id","r.score","c.*")
  .where({ "m.movie_id": movie_id })
  .then(reviews => reviews.map(review => addCritic(review)));
  ;
}

async function read(movie_id) {
  // TODO: Add your code here
  return db("movies").select("*").where({ movie_id: movie_id }).first();

}

module.exports = {
  list,
  read,
  getTheatersShowingMovie,
  getReviewsForMovie,
};
