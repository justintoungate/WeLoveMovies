const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//const reviewsRouter = require("../reviews/reviews.router");
//const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
const cors = require("cors");
router.use(cors())

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

  router
  .route("/:movieId/theaters")
  .get(controller.getTheatersShowingMovie)
  .all(methodNotAllowed);


  router
  .route("/:movieId/reviews")
  .get(controller.getReviewsForMovie)
  .all(methodNotAllowed);

module.exports = router;
