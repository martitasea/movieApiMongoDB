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
// Esto debe ejecutarse en el botón de detalles de la Home
exports.getFilmDetail = async (film) => {
  const client = await connect();
   result = await client
     .db("moviedb")
     .collection("peliculas")
     .findOne({ titulo: film });
   if (result) {
     console.log(`He encontrado un elemento '${film}' en la colección:`);
     return result;
   } else {
     return null
   }
 };

//----------------------------------------------------------------------------
// R_LEER MUCHOS
//----------------------------------------------------------------------------
// Esto debe leerse en la Home
exports.getFilmsDetail = async () => {
  const client = await connect();
  result = await client
     .db("moviedb")
     .collection("peliculas")
     .find()
     .toArray();
  if (result) {
    return result;
} else {
     return null
   }
 };
//----------------------------------------------------------------------------
// U_ACTUALIZAR UNO
//----------------------------------------------------------------------------
// Esto debe ejecutarse dentro del detalles de la Home
// exports.updateFilm=(db, id, nuevaDir)=>{
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
  console.log(nameFilm)
  const client = await connect();
  const result = await client
     .db("moviedb")
     .collection("peliculas")
     .deleteOne({film:nameFilm})
//   if (result) {
//     return result;
//     console.log(`${result.deletedCount} document(s) was/were deleted.`);
// } else {
//      return null
//    }
 };