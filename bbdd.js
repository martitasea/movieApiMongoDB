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
exports.getFilmDetail = async (nombre) => {
  const client = await connect();
   result = await client
     .db("moviedb")
     .collection("peliculas")
     .findOne({ titulo: nombre });
   if (result) {
     console.log(`He encontrado un elemento '${nombre}' en la colección:`);
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
    //  console.log(result[0].titulo);
     return result;
} else {
     return null
   }
 };

// exports.getFilmsDetail = async () => {
//   const client = await connect();
//   let query={titulo:"El Golpe"}
//    result = await client
//      .db("moviedb")
//      .collection("peliculas")
//      .find()
//      .toArray();
//    if (result) {
//      let titulo=query.titulo
//      console.log("Hay resultado");
//      console.log(query.director)
//      return result;
// } else {
//      return null
//    }
//  };

//  async function findMany() {
//   const client = await MongoClient.connect(url, {
//     useNewUrlParser: true, useUnifiedTopology: true
//   })
//   .catch(err => {console.log(err)});
 
//   if (!client) {
//     return;
//   }

//   try {
//     const db = client.db("mydb");
//     let collection = db.collection("clientes");
//     let query = { name: "Peter" };
//     let res = await collection.find(query).toArray();
//     console.log(res);
    
//   } catch (err) {
//     console.log(err);
//   } finally {
//     client.close();
//   }
// };

// findMany();


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
