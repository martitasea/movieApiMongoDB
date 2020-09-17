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
// Esto debe ejecutarse dentro del post del formulario

exports.createFilm = async (newListing) => {
    const client = await connect();
    const result = await client
      .db("moviedb")
      .collection("peliculas")
      .insertOne(newListing);
    console.log(
      `Nuevo listado creado con la siguiente identificación: ${result.insertedId}`
    );
  };
//----------------------------------------------------------------------------
// R_LEER UNO
//----------------------------------------------------------------------------
// Esto debe ejecutarse dentro del get que hace la Home
// exports.getClient = async (nombre) => {
//   const client = await connect();
//    result = await client
//      .db("moviedb")
//      .collection("peliculas")
//      .findOne({ titulo: nombre });
//    if (result) {
//      console.log(`He encontrado un elemento '${nombre}' en la colección:`);
//      return result;
//    } else {
//      return null
//    }
//  };
//----------------------------------------------------------------------------
// U_ACTUALIZAR UNO
//----------------------------------------------------------------------------
// Esto debe ejecutarse dentro del detalles de la Home






//----------------------------------------------------------------------------
// D_BORRAR UNO
//----------------------------------------------------------------------------
// Esto debe ejecutarse dentro del borrar de la Home
