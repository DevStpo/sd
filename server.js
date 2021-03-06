const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const tickets = require("./routes/api/tickets");
const comments = require("./routes/api/comments");
const views = require("./routes/api/views");
const workflows = require("./routes/api/workflows");
const ticketTypes = require("./routes/api/ticketTypes");
const companies = require("./routes/api/companies");
const testModels = require("./routes/api/testModels");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use routes
app.use("/api/tickets", tickets);
app.use("/api/comments", comments);
app.use("/api/views", views);
app.use("/api/workflows", workflows);
app.use("/api/comments", comments);
app.use("/api/companies", companies);
app.use("/api/ticketTypes", ticketTypes);
app.use("/api/testModels", testModels);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
