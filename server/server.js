const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../portfolio/public"));
app.use(cors());

mongoose.connect(
  "mongodb+srv://Bhanu:Bhanu@cluster0.cmemr.mongodb.net/Bhanu?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, //promise connection completion in mongo db server
    useUnifiedTopology: true, //    Connection allowance
  }
);

const db = mongoose.connection;
db.on("Error", () => {
  console.log("Connection error");
});
db.once("open", () => {
  console.log(`Database connected on ${port} : successfully`);
});

const schemaTemplate = require("./models/Contactschema");

app.post("/send", (req, res) => {
  const data = new schemaTemplate({
    name: req.body.name,
    email: req.body.email,
    project: req.body.project,
    message: req.body.message,
  });
  db.collection("userData").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    } else {
      console.log(`Data inserted`, collection);
    }
  });
 
});

app.get("/", (req, res) => {
  return res.redirect("index.html");
});

app.listen(port, () => {
  console.log(`Server run on ${port}: successfull`);
});
