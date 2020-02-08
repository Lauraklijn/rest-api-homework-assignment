// 1. Create a new JavaScript file named `sequelize-rest.js`.
// 2. Install the dependency `sequelize@5.8.6` - Installed

// 3. In the JavaScript file, initialize the database connection with Sequelize.
const Sequelize = require("sequelize");
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";
const dataBase = new Sequelize(databaseUrl);
const port = process.env.PORT || 4000;
// --------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 4. Using Sequelize, define a model called `Movie` with the following properties (in addition to an ID):
// - `title` (text), `yearOfRelease` (number), `synopsis` (text)
const Movie = dataBase.define("movies", {
  title: {
    type: Sequelize.STRING,
    field: "movie_title"
  },
  yearOfRelease: {
    type: Sequelize.INTEGER,
    field: "Year_of_release"
  },
  synopsis: {
    type: Sequelize.STRING,
    field: "movie_synopsis"
  }
});

//5. Make sure the model is synched with the database upon startup.
dataBase
  .sync({ force: false }) //--> To clean database (first: true, then false)
  .then(() => console.log("database updated"))
  .catch(console.error);

// 6. Use the model `create()` method to insert 3 rows of example data. This logic should happen _after_ the model synchronization completes. The data should persist. Restarting the API should not cause any data to be lost.
const movieData = Movie.create(
  {
    title: "Titanic",
    yearOfRelease: "1997",
    synopsis: "Sinking ship"
  },
  Movie.create(
    {
      title: "Avatar",
      yearOfRelease: "2009",
      synopsis: "Epic science fiction"
    },
    Movie.create({
      title: "The Shawshank Redemtion",
      yearOfRelease: "1994",
      synopsis: "Drama in penitentairy"
    })
  )
);

app.use(bodyParser.json());

//7. Create an express app with routes that support the following RESTful actions on the "movies" resources.
// 1. create a new movie resource
// 2. read all movies (the collections resource)
// 3. read a single movie resource
// 4. update a single movie resource
// 5. delete a single movie resource

// 1. Create a new movie resource --> Use post
app.post("/movies", (request, response, next) => {
  Movie.create(request.body)
    .then(movie => response.json(movie))
    .catch(error => next(error));
});

// 2. Read all movies --> Use get
// Implement pagination(9.) on the "read all" collections resource end-point (user must be able to use limit & offset).
app.get("/movies", (request, response, next) => {
  const limit = request.query.limit || 5;
  const offset = reqest.query.offset || 0;

  Movie.findAndCountAll({ limit, offset })
    .then(resultPerPage =>
      response.send({ Data: resultPerPage.rows, Total: resultPerPage.count })
    )
    .catch((error = next(error)));
});

// 3. Read a single movie resource --> Use get
app.get("/movies/:id", (request, response, next) => {
  Movie.findByPK(request, params.id)
    .then(movie => {
      if (!movie) {
        response.status(404).end();
      } else {
        response.json(movie);
      }
    })
    .catch(error => next(error));
});

// 4. Update a single movie resource --> Use put
app.put("/movies/:id", (request, response, next) => {
  Movie.findByPk(request.params.id)
    .then(movie => {
      if (movie) {
        movie.update(req.body).then(movie => response.json(movie));
      } else {
        response.status(404).end(); //8. Make sure that your handlers send back `404` status codes.
      }
    })
    .catch(error => next(error));
});

// 5. Delete a single movie resource --> Use delete
app.delete("/movie/:id", (request, response, next) => {
  Movie.destroy({ where: { id: request.params.id } })
    .then(num => {
      if (num) {
        response.send({ message: "Movie is deleted" });
      } else {
        response.status(404).end(); //8. Make sure that your handlers send back `404` status codes.
      }
    })
    .catch(error => next(error));
});

// Call port:
app.listen(port, () => console.log(`Listening on port: ${port}`));

// 10. Make sure that all endpoints handle database errors in the promise chain. Errors should be handled by Express' built-in error handler.

// I got errors by running http in terminal, I could not find out why.
