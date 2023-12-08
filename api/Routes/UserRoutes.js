/* eslint-disable no-undef */
const { addToLikedMovies } = require("../Controllers/UserController");

const router = require("express").Router();

router.post("/add",addToLikedMovies);


module.exports = router;