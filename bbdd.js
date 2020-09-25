const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

//------------------------------------------------------------------------------
// CREAR BBDD
//------------------------------------------------------------------------------
// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("Base de datos creada!");

//   var dbo = db.db("moviedb"); //Accede a la BBDD
//------------------------------------------------------------------------------
// CREAR COLECCIÓN
//------------------------------------------------------------------------------
// dbo.createCollection("peliculas", function(err, res) {
//   if (err) throw err;
//   console.log("Colection creada!");
//   db.close();
// });
//------------------------------------------------------------------------------
// CONECTAR CON BBDD
//------------------------------------------------------------------------------
const connect = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });
  return client;
};
//---------------------------------------------------------------------------
// CRUD
// https://developer.mongodb.com/quickstart/node-crud-tutorial
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
// C_CREAR UN DOCUMENTO
//---------------------------------------------------------------------------
exports.createFilm = async (film) => {
  const client = await connect();
  const result = await client
    .db("moviedb")
    .collection("peliculas")
    .insertOne(film);
  console.log(
    `Nuevo listado creado con la siguiente identificación: ${result.insertedId}`
  );
};
//----------------------------------------------------------------------------
// R_LEER UNO
//----------------------------------------------------------------------------
exports.getFilmDetail = async (titulo) => {
  const client = await connect();
  result = await client
    .db("moviedb")
    .collection("peliculas")
    .findOne({ title: titulo });
  if (result) {
    console.log(`He encontrado un elemento '${result.title}' en la colección`);
    return result;
  } else {
    return null;
  }
};

//----------------------------------------------------------------------------
// R_LEER MUCHOS
//----------------------------------------------------------------------------
// Esto debe leerse en la Home
exports.getFilmsDetail = async () => {
  const client = await connect();
  result = await client.db("moviedb").collection("peliculas").find().toArray();
  if (result) {
    return result;
  } else {
    return null;
  }
};
//----------------------------------------------------------------------------
// U_ACTUALIZAR UNO
//----------------------------------------------------------------------------
exports.updateFilm = async (id, film) => {
  const client = await connect();
  result = await client
    .db("moviedb")
    .collection("peliculas")
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          title: film.title,
          poster: film.poster,
          director: film.director,
          genre: film.genre,
          country: film.country,
          released: film.released,
          runtime: film.runtime,
          score: film.score,
          actors: film.actors,
          plot: film.plot,
          awards: film.awards,
        },
      }
    );
  if (result) {
    return result;
  } else {
    return null;
  }
};

// exports.updateFilm=(id, nuevaDir)=>{
//   var dbo = db.db("moviedb");
//   var myquery = { id: id };
//   var newvalues = { $set: { address: nuevaDir } };
//   dbo
//     .collection("peliculas")
//     .updateMany(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log(res.result.nModified + " documento(s) actualizados");
//       db.close();
//     });
// }

// function actualizarDatos(db, nombre, nuevaDir) {
//   var dbo = db.db("mydb");
//   var myquery = { name: nombre };
//   var newvalues = { $set: { address: nuevaDir } };
//   dbo
//     .collection("clientes")
//     .updateMany(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log(res.result.nModified + " documento(s) actualizados");
//       db.close();
//     });
// }

//----------------------------------------------------------------------------
// D_BORRAR UNO
//----------------------------------------------------------------------------
// Esto debe ejecutarse dentro del borrar de la Home
exports.deleteFilm = async (nameFilm) => {
  const client = await connect();
  const result = await client
    .db("moviedb")
    .collection("peliculas")
    .deleteOne({ title: nameFilm });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
  //Esto lo tenía comentado
  if (result) {
    return result;
  } else {
    return null;
  }
};
