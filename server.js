const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const compression = require("compression");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

// routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


// from class exercise