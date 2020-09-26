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
  res.status(200).render("Form", { action: "Crear Película",
rutaPost:"/filmSave" });
};

exports.createFilm = (req, res) => {
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
        year: myJson.Year,
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
PAGINA DE BORRAR
---------------------------------------------------------------------- */
exports.deleteFilm = (req, res) => {
  let peli = req.body.title;
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
PAGINA DE DETALLES FAVORITOS
---------------------------------------------------------------------- */
exports.getFilmDetail = (req, res) => {
  var titulo = req.params.title;
  bbdd
    .getFilmDetail(titulo)
    .then((response) => {
      console.log(response);
      res.render("Film", {
        id:response._id,
        title: response.title,
        poster: response.poster,
        director: response.director,
        genre: response.genre,
        country: response.country,
        year: response.year,
        runtime: response.runtime,
        score: response.score,
        actors: response.actors,
        plot: response.plot,
        awards: response.awards,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
/* ----------------------------------------------------------------------
LEER PARA ACTUALIZAR
---------------------------------------------------------------------- */
exports.editFilm = (req, res) => {
  var titulo = req.params.title;
  // console.log(id);
  bbdd
    .getFilmDetail(titulo)
    .then((response) => {
      res.render("Form", {
        action: "Editar",
        rutaPost:"/update",
        id:response._id,
        title: response.title,
        poster: response.poster,
        director: response.director,
        genre: response.genre,
        country: response.country,
        year: response.year,
        runtime: response.runtime,
        score: response.score,
        actors: response.actors,
        plot: response.plot,
        awards: response.awards,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
/* ----------------------------------------------------------------------
ACTUALIZAR
---------------------------------------------------------------------- */
exports.updateFilm = (req, res) => {
  var id=req.body.id;
  console.log("el archivo rutas")
  console.log(req.body);
  bbdd
  .updateFilm(id, req.body)
  .then((data)=>{
    console.log("Documentos cambiados: "+data.result.nModified);
  res.status(200).redirect("/");
  })
  .catch((e)=>console.log(e));
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
