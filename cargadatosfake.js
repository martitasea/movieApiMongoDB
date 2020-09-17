var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

//------------------------------------------------------------------------------
//   CREAR BBDD
//------------------------------------------------------------------------------
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Base de datos creada!");

  var dbo = db.db("moviedb"); //Accede a la BBDD mydb
  // dbo.createCollection("peliculas", function(err, res) {
  //   if (err) throw err;
  //   console.log("Colection creada!");
  //   db.close();
  // });
  
//------------------------------------------------------------------------------
//  METER DATOS
//------------------------------------------------------------------------------
  var myfilms = [
    {
      titulo: "Persiguienpolis",
      poster: "https://pics.filmaffinity.com/persepolis-701715841-large.jpg",
      director: "Marjane Satrapi",
      released: "2007",
      runtime: "95min",
      actors: "Animacion",
      score: "10",
      plot:
        "Narra la conmovedora historia de una niña iraní desde la revolución islámica hasta nuestros días. Cuando los fundamentalistas toman el poder, forzando a las mujeres a llevar velo y encarcelando a miles de personas, y mientras tiene lugar la guerra entre Irak e Irán, Marjane descubre el punk, ABBA y Iron Maiden. Cuando llega a la adolescencia sus padres la envían a Europa, donde conoce otra cultura que nada tiene que ver con la de su país. La protagonista se adapta bien a su nueva vida, pero no soporta la soledad y vuelve con su familia, aunque eso signifique ponerse el velo y someterse a una sociedad tiránica. Voces originales en francés de Catherine Deneuve y Chiara Mastroianni.",
    },
    {
      titulo: "El Golpe",
      poster: "https://pics.filmaffinity.com/the_sting-433653100-large.jpg",
      director: "George Roy Hill",
      released: "1973",
      runtime: "129min",
      actors: "Robert Redford, Paul newman, Robert Shaw",
      score: "10",
      plot:
        "Chicago, años treinta. Johnny Hooker (Redford) y Henry Gondorff (Newman) son dos timadores que deciden vengar la muerte de un viejo y querido colega, asesinado por orden de un poderoso gángster llamado Doyle Lonnegan (Shaw). Para ello urdirán un ingenioso y complicado plan con la ayuda de todos sus amigos y conocidos.",
    },
  ];

  dbo.collection("peliculas").insertMany(myfilms, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
