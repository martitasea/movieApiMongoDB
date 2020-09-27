// ----------------------------------------------------------------------
// BUSCAR UNA PELÍCULA EN LA API
// ----------------------------------------------------------------------
function getFilmDetails() {
  let title = document.getElementById("filmSearch");
  location.replace("/films/" + title.value);
}
// ----------------------------------------------------------------------
// GUARDAR UNA PELI DE LA API EN BBDD
// ----------------------------------------------------------------------
function saveFilmApi() {
  let newFilm = {
    title: document.getElementById("sheetHeader").innerText,
    poster: document.getElementById("poster").src,
    director: document.getElementById("director").innerText,
    genre: document.getElementById("genre").innerText,
    country: document.getElementById("country").innerText,
    year: document.getElementById("year").innerText,
    runtime: document.getElementById("runtime").innerText,
    actors: document.getElementById("actors").innerText,
    plot: document.getElementById("about").innerText,
    awards: document.getElementById("awards").innerText,
    score:document.getElementById("score").innerText
  };
  fetch("/filmsave", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(newFilm),
  })
    .then((data) => {
      location.replace("/");
    })
    .catch((e) => console.log("Ocurrió un error:" + e));
}
// ----------------------------------------------------------------------
// BORRAR UNA PELI DE BBDD DESDE LA HOME
// ----------------------------------------------------------------------
function deleteFilmDetails(film) {
  fetch("/film/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ title: film }),
  })
    .then((res) => {
      location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
}
// ----------------------------------------------------------------------
// MOSTRAR DETALLES DE FAVORITOS
// ----------------------------------------------------------------------
function seeFilmDetails(title) {
  location.replace(`/films/detail/${title}`)
}
// ----------------------------------------------------------------------
// EDITAR LOS CAMPOS DE FAVORITOS
// ----------------------------------------------------------------------
function readFilmDetails(title) {
  location.replace(`/film/edit/${title}`)
}