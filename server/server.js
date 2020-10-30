require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.MONGO_URI);
client.connect();

const express = require("express");
const bodyparser = require(`body-parser`);
// const cors = require(`cors`);

const app = express();
// app.use(cors());
app.use(bodyparser.json());
app.use(express.static(`static`));

app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept, Authorization`
  );
  res.setHeader(
    `Access-Control-Allow-Methods`,
    `GET, POST, PATCH, DELETE, OPTIONS`
  );
  next();
});

app.post(
  `/api/login`,
  wrapAsync(async (req, res) => {
    const { username, password } = req.body;
    const db = client.db();
    const user = await db
      .collection("Users")
      .findOne({ username: username, password: password });

    const response = {
      id: -1,
      fName: "",
      lName: "",
      error: "",
    };

    if (!user) {
      response.error = "No account found.";
      res.status(400).json(response);
      return;
    }

    response.id = user._id;
    response.fName = user.userInfo.fName;
    response.lName = user.userInfo.lName;

    res.status(200).json(response);
  })
);

app.listen(process.env.PORT || 5000, () => {});

function wrapAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      console.log(error);
      res.status(500).send();
    });
  };
}
