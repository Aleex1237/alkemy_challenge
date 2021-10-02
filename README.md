# Challenge Alkemy

## Desafio Disney con **Node.Js**  
La api de Disney fue creada con la tecnologia Node.js y su framework Express. Como gestor de bases de datos se utilizó MySQL y como ORM la librería Sequelize.
Se han implementado diferentes herramientas como express-validator, jwt, bcrypt, etc... Para poder crear una API funcional, segura y comoda de usar.
Para poder utilizar los endpoints en la carpeta scripts existe el archivo "disneyChallenge_endpoints.json" el cual se ejecuta con la aplicación Postman.

### ¿Como correr el proyecto?  
Para poder inicializar el proyecto debe correr los comandos:  
**npm install**  
Y luego que se instalen las dependecias:  
**nodemon**

### ¿Como conectarse a la base de datos mediante variables de entorno?  
El archvivo .env.example cambiarle el nombre por ".env".  
DB_USERNAME será igual a su usuario de MySQL
DB_PASSWORD será igual a la contraseña de usuario que utiliza en MySQL

### ¿Como setear el SECRET en Json Web Token?

Deberá en el archivo .env del punto anterior colocar la cadena de texto que desee y así el servidor podrá firmar los tokens que generé la API

## Aclaraciones
NO OLVIDAR QUE AL LOGUEAR EL USUARIO DEBE SETEAR EN AUTHORIZATION EL TOKEN

Algunos endpoints tendrán requerimientos "especiales" algunos de ellos son  
  
/characters/search?age=&movie=&name=  
El cual acepta 3 tipos de queryStrings donde en age irá un numero que será la edad del personaje, en movie irá el id de la pelicula que deseemos y en name el nombre del personaje que deseemos buscar.  

El endpoint para buscar peliculas tambien acepta 3 queryStrings
/movies/search?name=&genre=&order=

name: nombre de la pelicula, genre: numero id del genero, y order: que por defecto tiene como atributo ASC el cual ordena alfabeticamente los nombres de las peliculas pero podría ser reemplazado por DESC que haría lo contrario.
  
 El endpoint para asociar peliculas y personajes acepta 2 parametros por el body  idCharacter: el cual espera el id de un personaje y idMovie: el cual espera el id de una pelicula
/movies/associate
