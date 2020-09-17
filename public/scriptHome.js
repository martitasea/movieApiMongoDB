// ----------------------------------------------------------------------
// BUSCAR UNA PELÍCULA EN LA API-----------------------------------------
// ----------------------------------------------------------------------
function getFilmDetails() {
  let pelicula = document.getElementById("movSearch");
  location.replace("/films/" + pelicula.value);
}
document
  .getElementById("buttonSearch")
  .addEventListener("click", getFilmDetails);

// ----------------------------------------------------------------------
// BORRAR UNA PELI DE FAVORITOS DESDE LA HOME----------------------------
// ----------------------------------------------------------------------
function deleteFilmDetails(titulo) {
  let filmsSaved = JSON.parse(localStorage.getItem("filmsStored"));
  console.log(filmsSaved);
  for (let i = 0; i < filmsSaved.length; i++) {
    console.log(filmsSaved[i].titulo);
    console.log(titulo);
    if (filmsSaved[i].titulo == titulo) {
      console.log(filmsSaved[i].titulo);
      let confirmation = confirm("¿Seguro que quieres borrarla?");
      if (confirmation) {
        filmsSaved.splice(i, 1);
        localStorage.setItem("filmsStored", JSON.stringify(filmsSaved));
        let url = "/";
        location.replace(url);
      }
    }
  }
}
// ----------------------------------------------------------------------
// EDITAR LOS CAMPOS DE FAVORITOS ---------------------------------------
// ----------------------------------------------------------------------
function editFilmDetails(titulo) {
  let filmsSaved = JSON.parse(localStorage.getItem("filmsStored"));
  for (let i = 0; i < filmsSaved.length; i++) {
    if (filmsSaved[i].titulo == titulo) {
      console.log("hola");
      location.replace(
        "films/edit/" +
          i +
          "?titulo=" +
          filmsSaved[i].titulo +
          "&director=" +
          filmsSaved[i].director +
          "&released=" +
          filmsSaved[i].released +
          "&runtime=" +
          filmsSaved[i].runtime +
          "&poster=" +
          filmsSaved[i].poster +
          "&watched=" +
          filmsSaved[i].watched +
          "&liked=" +
          filmsSaved[i].liked +
          "&score=" +
          filmsSaved[i].score
      );
    }
  }
}

// ----------------------------------------------------------------------
// MOSTRAR DETALLES DE FAVORITOS ---------------------------------------
// ----------------------------------------------------------------------
function seeFilmDetails(titulo) {
  let filmsSaved = JSON.parse(localStorage.getItem("filmsStored"));
  for (let i = 0; i < filmsSaved.length; i++) {
    if (filmsSaved[i].titulo == titulo) {
      console.log("hola");
      location.replace(
        "films/detail/" +
          i +
          "?titulo=" +
          filmsSaved[i].titulo +
          "&director=" +
          filmsSaved[i].director +
          "&released=" +
          filmsSaved[i].released +
          "&runtime=" +
          filmsSaved[i].runtime +
          "&poster=" +
          filmsSaved[i].poster +
          "&watched=" +
          filmsSaved[i].watched +
          "&liked=" +
          filmsSaved[i].liked +
          "&score=" +
          filmsSaved[i].score
      );
    }
  }
}
// location.replace("/films/"+filmsSaved[i].titulo); //Coge los detalles del fetch

// ----------------------------------------------------------------------
// ESCRIBIR EN LA HOME LAS PELÍCULAS DE LOCALSTORAGE---------------------
// ----------------------------------------------------------------------
let saved = JSON.parse(localStorage.getItem("filmsStored"));
for (let i = 0; i < saved.length; i++) {
  let visto = "";
  if (saved[i].watched == "on") {
    visto = "checked";
  } else visto = "";

  let card = `
  <h2 id="filmTit" class="fontPix">${saved[i].titulo}</h2>
  <div id="smallFilmHome">
    <img id="posterApi" src="${saved[i].poster}" alt="Film Poster" />
    <div id="detFilmHome">
        <div class="catFilmHome">
            <p class="key fontSecondBold">Director</p>
            <p class="value fontSecond">${saved[i].director}</p>
        </div>
        <div class="catFilmHome">
            <p class="key fontSecondBold">Fecha</p>
            <p class="value fontSecond">${saved[i].released}</p>
        </div>
        <div class="catFilmHome">
            <p class="key fontSecondBold">Duración</p>
            <p class="value fontSecond">${saved[i].runtime}</p>
        </div>
        <div id="iconsHome">
            <img src="./img/eye.png" alt="watched" id="eye"/>
            <input type="checkbox" name="yes" id="watched" ${visto}/>
            <img src="./img/loved.png" alt="loved" id="heart"/>
            <input type="checkbox" name="yes" id="liked" value="${saved[i].liked}"/>
        </div>
    </div>
    <div id="scoreFilm">
      <p class="fontPix">${saved[i].score}</p>
    </div>    
  </div>
  <nav id="navSheet">
    <a href="#" id="butEditS" class="but fontSecond" onclick="editFilmDetails('${saved[i].titulo}')">Editar</a>
    <a href="#" id="butDeleteS" class="but fontSecond" onclick="deleteFilmDetails('${saved[i].titulo}')">Borrar</a>
    <a href="#" id="butDetailS" class="but fontSecond" onclick="seeFilmDetails('${saved[i].titulo}')">Detalles</a>
  </nav>
  `;
  document.getElementById("sheet").innerHTML += card;
}
