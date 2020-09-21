const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const rutas = require("./rutas.js"); //Módulos propios funcionamiento
const app = express();
// let titulo = "gladiator";

//---------------------------------------------------------------------------
// MIDDLEWARE
//---------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true })); //hace accesible la info
app.use(express.static("public"));//esta es la carpeta que mandamos a cliente
app.use("/films/:titulo", express.static(__dirname + "/public"));
app.use("/films/detail/:i", express.static(__dirname + "/public"));
app.use("/films/edit/:i", express.static(__dirname + "/public"));

//---------------------------------------------------------------------------
// MOTOR DE VISTA
//---------------------------------------------------------------------------
app.set("view engine", "./views"); //De donde lee el pug
app.set("view engine", "pug"); //Definimos el motor de vista

//---------------------------------------------------------------------------
//RUTAS
//---------------------------------------------------------------------------

//HOME
app.get("/", rutas.getHome);

//PAGINA DETALLES COGIDOS DE LA API
app.get("/films/:titulo", rutas.getFilmApi);

//PAGINA DE DETALLES FAVORITOS
app.get("/films/detail/:titulo", rutas.getFilmDetail);

// PAGINA DE EDITAR
app.get("/films/edit/:id", rutas.editFilm);

// PAGINA DE BORRAR
// app.post("/films/delete/:id", rutas.deleteFilm);

//PAGINA DE FORMULARIO
app.get("/formulario", rutas.getForm);
app.post("/exito", rutas.postForm);

//ENRUTAMIENTO CON LA API
app.get("/api/films/:titulo", rutas.getApiFilm);

//TODAS LAS DEMÁS PÁGINAS
app.get("*", rutas.getAll);

/* ----------------------------------------------------------------------
DEFINICIÓN DEL PUERTO AL QUE TIENEN QUE ATENDER
---------------------------------------------------------------------- */
app.listen(port, () => {
  console.log(
    `Tu servidor local está en la siguiente ruta http://localhost:${port}`
  );
});
