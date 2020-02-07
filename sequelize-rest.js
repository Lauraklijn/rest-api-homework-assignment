const Sequelize = require("sequelize");
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

const Movie = db.define("movies", {
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

db.sync()
  .then(() => console.log("database updated")) // add a then callback that sends newly created team as the response
  .catch(console.error); //add catch callback where you pass any caught errors to next

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
movieData.then(movie => {
  console.log("user", movie.get());
});
