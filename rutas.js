const fetch = require("node-fetch");
const bbdd = require("./bbdd.js"); //Módulos propios BBDD



/* ----------------------------------------------------------------------
HOME
---------------------------------------------------------------------- */
exports.getHome = (req, res) => {
  res.render("Home", {
    title: "Pixel Movie",
  });
  // bbdd.getClient(titulo);
};
/* ----------------------------------------------------------------------
PAGINA DE DETALLES COGIDOS DE LA API
---------------------------------------------------------------------- */
exports.getFilmApi = (req, res) => {
  titulo = req.params.titulo;
  fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=ca4abc94`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      res.render("Film", {
        titulo: myJson.Title,
        poster: myJson.Poster,
        director: myJson.Director,
        released: myJson.Released,
        runtime: myJson.Runtime,
        actors: myJson.Actors,
        score: myJson.imdbRating,
        plot: myJson.Plot,
      });
    });
};
/* ----------------------------------------------------------------------
PAGINA DE DETALLES FAVORITOS
---------------------------------------------------------------------- */
exports.getFilmDetail = (req, res) => {
  res.status(200).render("Film", {
    // titular: "Editar",
    titulo: req.query.titulo,
    director: req.query.director,
    id: req.query.id,
    released: req.query.released,
    runtime: req.query.runtime,
    poster: req.query.poster,
    watched: req.query.watched,
    liked: req.query.liked,
    score: req.query.score,
  });
};
/* ----------------------------------------------------------------------
---------------------------PAGINA DE EDITAR------------------------------
---------------------------------------------------------------------- */
exports.editFilm = (req, res) => {
  res.status(200).render("Form", {
    id: req.params.id,
    action: "Editar Película",
    titulo: req.query.titulo,
    director: req.query.director,
    released: req.query.released,
    runtime: req.query.runtime,
    poster: req.query.poster,
    watched: req.query.watched,
    liked: req.query.liked,
    score: req.query.score,
  });
};
/* ----------------------------------------------------------------------
---------------------------PAGINA DE FORMULARIO--------------------------
---------------------------------------------------------------------- */
exports.getForm = (req, res) => {
  res
    .status(200)
    .render("Form", { title: "Formulario", action: "Crear Película" });
};

exports.postForm = (req, res) => {
  console.log(req.body);
  var film = req.body;
  bbdd.createFilm(film);
  res.status(200).redirect("/");
};
/* ----------------------------------------------------------------------
-------------------------ENRUTAMIENTO CON LA API-------------------------
---------------------------------------------------------------------- */
const apikey = "ca4abc94";

exports.getApiFilm = (req, res) => {
  titulo = req.params.title;
  fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=${apikey}`)
    .thes(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      res.send(
        "Me has preguntado por la película " +
          myJson.Title +
          ". El director es " +
          myJson.Director +
          ". El año es " +
          myJson.Year +
          "."
      );
    });
};
/* ----------------------------------------------------------------------
------------------------TODAS LAS DEMÁS PÁGINAS--------------------------
---------------------------------------------------------------------- */
exports.getAll = (req, res) => {
  res.status(404).render("error", { title: "Error" });
};