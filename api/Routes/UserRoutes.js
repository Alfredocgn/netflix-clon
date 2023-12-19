/* eslint-disable no-undef */
const { addToLikedMovies, getLikedMovies } = require("../Controllers/UserController");

const router = require("express").Router();

router.post("/add",addToLikedMovies);
router.get("/liked/:email",getLikedMovies);



module.exports = router;