const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");


router.get("/movies", (req, res, next) => {
    Movie.find()
    .then((allMovies) => {
        console.log("Retrieved movies from DB:", allMovies);
        res.render("movies/movies.hbs", { movies: allMovies });
    })
    .catch((error) => {
        console.log("Error while getting the movies from the DB: ", error);
    });
})

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render("movies/new-movie", {celebrities});
    })
    .catch((error) => {
        console.log("Error while getting the movies from the DB: ", error);
    });
    
})

router.post("/movies/create", (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
  
    Movie.create({title, genre, plot, cast})
    .then(() => res.redirect("/movies"))
    .catch((error) => res.render("movies/new-movie"));
});

router.get("/movies/:id", (req, res, next) => {
    const {id} = req.params;

    Movie.findById(id)
    .populate('cast')
    .then((movie) => {
        console.log("Retrieved movie from DB:", movie);
        res.render("movies/movie-details.hbs", {movie});
    })
    .catch((error) => {
        console.log("Error while getting the movie details from the DB: ", error);
    });
})

router.post("/movies/:id/delete", (req, res, next) => {
    const {id} = req.params;
  
    Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((error) => {
        console.log("Error while deleting movie from the DB: ", error);
    });
});

router.get("/movies/:id/edit", async (req, res, next) => {
    const {id} = req.params;
    // const {title, genre, plot, cast = allCelebs} = req.body
    try {
        const movie = await Movie.findById(id).populate('cast')
        const allCelebs = await Celebrity.find()
    
        res.render("movies/edit-movie", {movie});
    } catch(error)  {
        console.log("Error while getting the movie details for editing: ", error);
    }
});

// router.post("/movies/:id", (req, res, next) => {
//     const {id} = req.params;
//     const {title, genre, plot, cast} = req.body;
//     const celebrities = Celebrity.find()
  
//     const movie = Movie.create({title, genre, plot, cast})
    
//     .then((movie) => {
//         Movie.findByIdAndUpdate(id, movie)
//         res.redirect("/movies")
//     })
//     .catch((error) => res.render("movies/movie-details"));
// });

module.exports = router;