const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movie = await service.read(request.params.movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  const is_showing = request.query.is_showing;
  response.json({ data: await service.list(is_showing) });
}

async function getTheatersShowingMovie(request, response) {
  // TODO: Add your code here
  const movies = await service.getTheatersShowingMovie(request.params.movieId);
  response.json({ data: movies });
}

async function getReviewsForMovie(request, response) {
  // TODO: Add your code here
  const reviews = await service.getReviewsForMovie(request.params.movieId);

  response.json({ data: reviews });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  getTheatersShowingMovie: [ asyncErrorBoundary(movieExists), getTheatersShowingMovie],
  getReviewsForMovie: [ asyncErrorBoundary(movieExists), getReviewsForMovie]
};
