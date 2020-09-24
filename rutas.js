const { query } = require("express");
const fetch = require("node-fetch");
const bbdd = require("./bbdd.js"); //Módulos propios BBDD

/* ----------------------------------------------------------------------
HOME
---------------------------------------------------------------------- */
exports.getHome = (req, res) => {
  let i = 0;
  bbdd
    .getFilmsDetail()
    .then((data) =>
      res.status(200).render("Home", {
        films: data,
      })
    )
    .catch((e) => console.log("ocurrió un error:" + e));
};
/* ----------------------------------------------------------------------
FORMULARIO
---------------------------------------------------------------------- */
exports.getForm = (req, res) => {
  res.status(200).render("Form", { action: "Crear Película" });
};

exports.postForm = (req, res) => {
  bbdd.createFilm(req.body);
  res.status(200).redirect("/");
};
/* ----------------------------------------------------------------------
PAGINA DE DETALLES COGIDOS DE LA API
---------------------------------------------------------------------- */
exports.getFilmApi = (req, res) => {
  title = req.params.title;
  fetch(`http://www.omdbapi.com/?t=${title}&apikey=ca4abc94`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      res.render("Film", {
        title: myJson.Title,
        poster: myJson.Poster,
        director: myJson.Director,
        released: myJson.Released,
        runtime: myJson.Runtime,
        actors: myJson.Actors,
        score: myJson.imdbRating,
        genre: myJson.Genre,
        plot: myJson.Plot,
        country: myJson.Country,
        awards: myJson.Awards,
      });
    });
};
/* ----------------------------------------------------------------------
GUARDAR EN BBDD PELI DE LA API
---------------------------------------------------------------------- */
exports.saveFilmApi = async (req, res) => {
  console.log("entramos al post");
  let film = await req.body;
  bbdd.createFilm(film);
  res.status(200).redirect("/");
};

/* ----------------------------------------------------------------------
XXXXX_______PAGINA DE EDITAR
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
PAGINA DE BORRAR
---------------------------------------------------------------------- */
exports.deleteFilm = (req, res) => {
  let peli=req.body.title
  console.log("peli")
  console.log(peli)
  bbdd
    .deleteFilm(peli)
    .then((response) => {
      res.send();
    })
    .catch((e) => {
      console.log(e);
    });
};
/* ----------------------------------------------------------------------
XXXXX_______PAGINA DE DETALLES FAVORITOS
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
TODAS LAS DEMÁS PÁGINAS
---------------------------------------------------------------------- */
exports.getAll = (req, res) => {
  res.status(404).render("error", { title: "Error" });
};

/* ----------------------------------------------------------------------
ENRUTAMIENTO CON LA API__NO LO ESTOY USANDO
---------------------------------------------------------------------- */
const apikey = "ca4abc94";

exports.getApiFilm = (req, res) => {
  titulo = req.params.title;
  fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=${apikey}`)
    .then(function (response) {
      // .then((response) => response.json())
      // return response.json();
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
