// ----------------------------------------------------------------------
// GUARDAR UNA PELÍCULA EN LOCAL STORAGE DESDE FORMULARIO
// ----------------------------------------------------------------------
// localStorage.clear();
function saveFilmDetails() {
  let filmsSaved = [];
  localStorage.getItem("filmsStored")
    ? (filmsSaved = JSON.parse(localStorage.getItem("filmsStored")))
    : (filmsSaved = []);
  let newFilms = {
    titulo: document.getElementById("titulo").value,
    director: document.getElementById("director").value,
    released: document.getElementById("released").value,
    runtime: document.getElementById("runtime").value,
    score: document.getElementById("score").value,
    watched: document.getElementById("watched").value,
    liked: document.getElementById("liked").value,
    poster: document.getElementById("poster").value,
  };

  // Hacer dos tipos de guardado, si vengo de Editar, si vengo de Crear hacer un push
  let action = document.getElementById("filmTit");
  console.log("vamos al if");
  if (action.innerText == "Editar Película") {
    console.log("if pasado");
    let position = document.getElementById("id").innerText;
    filmsSaved[position] = newFilms;
    localStorage.setItem("filmsStored", JSON.stringify(filmsSaved));
  } else {
    console.log("estamosen el else");
    filmsSaved.push(newFilms);
    localStorage.setItem("filmsStored", JSON.stringify(filmsSaved));
  }
}
document.getElementById("buttonSave").onclick = (e) => {
  // e.preventDefault();
  saveFilmDetails();
};
