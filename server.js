/**
 * Router: Un router en Express es una manera de agrupar rutas relacionadas. 
 * Es como un mini-servidor dentro del servidor principal. 
 * Ayuda a organizar el código cuando tienes muchas rutas.
 */

/**
 * Objetivo: crear un servidor que responda a consultas de peliculas
 * 1- Creamos la estructura del proyecto con un enrutador.
 * 2- Creamos los archivos 'server.js', '/routes/movieRoutes.js', '/public/movies.json'
 * 3- npm init -y. Configuramos el script con --watch.
 * * 4- npm intall express --save
 * 5- Codificamos en orden:
 * 5.1- Codificamos el server
 * 5.2- Codificamos el router  
 */


// impotacion de express
const express = require("express");

// instanciasion (inicializacion) de express 
const app = express();

// declaramos el puerto en el que queremos que el servidor escuche.
const PORT = 3000;

//LLAMAMOS AL MODULO DE ROUTES
const moviesRouter = require("./routes/moviesRouter");

// configuramos el router middleware
app.use(express.json());

//5- Uso del middleware express.json
// Este middleware nos permite analizar los cuerpos 
// de las solicitudes entrantes con formato JSON 
// se encarga de convertir el cuerpo de la solicitud 
// en un objeto JavaScript accesible a través de req.body.


//Definimos el prefijo principal de las ruta
// en este caso es /movies
// las rutas secundarias se agregan a través de /movies/<sub_ruta>
//Definimos el prefijo principal de la ruta
// Toda consulta a peliculas lo haremos desde /movies/sub_ruta
// las sub_rutas son manejadas por el módulo moviesRouter
app.use("/movies", moviesRouter);
// configuramos el puerto en el que queremos que el servidor escuche.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

