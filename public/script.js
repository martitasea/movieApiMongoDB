// ----------------------------------------------------------------------
// BUSCAR UNA PELÍCULA EN LA API
// ----------------------------------------------------------------------
function getFilmDetails() {
  let title = document.getElementById("movSearch");
  location.replace("/films/" + title.value);
}
// ----------------------------------------------------------------------
// GUARDAR UNA PELI DE LA API EN BBDD
// ----------------------------------------------------------------------
function saveFilmApi() {
  if(document.getElementById=="Crear Película"){
  let newFilm = {
    title: document.getElementById("sheetHeader").innerText,
    poster: document.getElementById("poster").src,
    director: document.getElementById("director").innerText,
    genre: document.getElementById("genre").innerText,
    country: document.getElementById("country").innerText,
    released: document.getElementById("released").innerText,
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
else{
  // location.replace("/film/edit")
}}
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


// function editFilmDetails(titulo) {
//   let filmsSaved = JSON.parse(localStorage.getItem("filmsStored"));
//   for (let i = 0; i < filmsSaved.length; i++) {
//     if (filmsSaved[i].titulo == titulo) {
//       console.log("hola");
//       location.replace(
//         "films/edit/" +
//           i +
//           "?titulo=" +
//           filmsSaved[i].titulo +
//           "&director=" +
//           filmsSaved[i].director +
//           "&released=" +
//           filmsSaved[i].released +
//           "&runtime=" +
//           filmsSaved[i].runtime +
//           "&poster=" +
//           filmsSaved[i].poster +
//           "&watched=" +
//           filmsSaved[i].watched +
//           "&liked=" +
//           filmsSaved[i].liked +
//           "&score=" +
//           filmsSaved[i].score
//       );
//     }
//   }
// }

