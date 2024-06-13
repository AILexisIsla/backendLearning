//8- Pasamos a configurar moviesRouter.js
/**
 * Router: Un router en Express es una manera de agrupar rutas relacionadas.
 * Es como un mini-servidor dentro del servidor principal.
 * Ayuda a organizar el código cuando tienes muchas rutas.
 * Cuando accedes a '/movies/sub_ruta' en tu navegador
 * o herramienta como Postman, la aplicación:
* Primero busca la ruta '/movies' en el archivo principal (server.js).
 * Luego delega el manejo de esa ruta al router moviesRouter.
 * Finalmente, dentro de moviesRouter, encuentra la subruta '/list'
 * y ejecuta la función correspondiente que devuelve "sub_ruta".
 */

const express = require("express");
const router = express.Router();

//importamos fs
const fs = require("fs");

// importamos path
const path = require("path");

// con path.join leemos/escribimos el archivo movies.json

const moviesPath = path.join(__dirname, "../public/movies.json");

// viene del fs, leemos y formateamos el archivo movies.json
const archivoJSON = fs.readFileSync(moviesPath, "utf8");

// convertimos el JSON a un array legible por Javascript
const movies = JSON.parse(archivoJSON);

//volvemos a la configuracion del routes


// Definimos el prefijo principal de las ruta
// en este caso es /movies
// las rutas secundarias se agregan a través de /movies/<sub_ruta>
router.get("/saludo", (req, res) => {
  res.json({mensaje:"Hola Mundo, desde la ruta /movies/saludo"});
});

router.get("/list", (req, res) => {
  res.json(movies);
});

// solicitudes de rutas parameticas
router.get("/:id", (req, res) => {
  //buscamos la pelicula con id solicitado
  
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  //si no encuentra la pelicula, devuelve un error

  if (!movie) {
    return res.status(404).send({ error: "Pelicula no encontrada" });
  } 

  //de encontrar la pelicula, devuelve su información
  res.json(movie);
});

//genera un metodo tipo post
//9- Solicitudes del tipo POST
// Una solicitud del tipo POST se utiliza para crear un nuevo recurso en el servidor. 
// En este caso recibimos una solicitud dentro de req

router.post("/", (req, res) => {
  //creamos una constante donde cargamos los datos recibidos
  //si no se envia un body, devuelve un error
  if (!req.body) {
    return res.status(400).send({ error: "Falta el body" });
  }

  //si se envia un body, se crea una nueva pelicula
  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    image: req.body.image,
  };

  //Agregamos los datos de newMovie a la lista de peliculas en el marray

  movies.push(newMovie);

  // convertimos el array a JSON
  const moviesUpdateJSON = JSON.stringify(movies, null, 2);

  // guardamos el array traformado a JSON EN MOVIES.JSON
  fs.writeFileSync(moviesPath, moviesUpdateJSON, "utf8");

  //enviamos una respuesta de exito
  res.status(201).json({ 
    message: "Pelicula creada con éxito",
    pelicula: newMovie
   });
 
});

//10- Solicitudes del tipo PUT
// El método PUT se utiliza para reemplazar completamente un recurso existente,
// a diferencia de PATCH que realiza modificaciones parciales.

router.put("/:id", (req, res) => {
  //buscamos la pelicula con id solicitado
  const movie = movies.find(m => m.id === parseInt(req.params.id));

  //si no encuentra la pelicula, devuelve un error
  if (!movie) {
    return res.status(404).send({ error: "Pelicula no encontrada" });
  }

  //(proceso de actualizacion)si se encuentra la pelicula, se reemplazan los datos recibidos
  movie.title = req.body.title || movie.title;
  movie.director = req.body.director || movie.director;
  movie.year = req.body.year || movie.year;
  movie.image = req.body.image || movie.image;

  //convertimos el array a JSON
  const moviesUpdateJSON = JSON.stringify(movies, null, 2);

  // guardamos el array traformado a JSON EN MOVIES.JSON
  fs.writeFileSync(moviesPath, moviesUpdateJSON, "utf8");

  //enviamos una respuesta de exito
  res.status(200).json({ 
    message: "Pelicula actualizada con éxito",
    pelicula: movie
   });
});




//exportamos el modulo
module.exports = router;