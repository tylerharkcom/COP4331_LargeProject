require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.MONGO_URI);
client.connect();

const express = require("express");
const bodyparser = require(`body-parser`);
const jwt = require(`jsonwebtoken`);
const cookieParser = require(`cookie-parser`);
//const cors = require(`cors`);

const app = express();
//app.use(cors());
app.use(bodyparser.json());
app.use(express.static(`static`));
app.use(cookieParser());

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
  `/api/register`,
  wrapAsync(async (req, res) => {
    const { username, password, fName, lName, email } = req.body;
    const userInfo = {
      fName,
      lName,
      email,
      accountCreated: new Date(),
      lastLogin: new Date(),
    }; // grouping info per the collection
    const db = client.db();

    const response = {
      error: "",
    };

    if (typeof username != "string") {
      // validating data to string
      response.error = "invalid data";
      res.status(400).json(response);
      return;
    }
    if (typeof password != "string") {
      response.error = "invalid data";
      res.status(400).json(response);
      return;
    }

    await db.collection("Users").insertOne({ username, password, userInfo });

    res.json(response);
  })
);

app.post(
  `/api/login`,
  wrapAsync(async (req, res) => {
    const { username, password } = req.body;
    const db = client.db();
    const user = await db
      .collection("Users")
      .findOne({ username: username, password: password });

    const response = {
      fName: "",
      lName: "",
      error: "",
    };

    if (!user) {
      response.error = "No account found.";
      res.status(400).json(response);
      return;
    }

    const token = generateAccessToken({
      id: user._id,
    });

    response.fName = user.userInfo.fName;
    response.lName = user.userInfo.lName;

    res
      .status(200)
      .cookie(`token`, token, {
        maxAge: 86400,
        httpOnly: true,
      })
      .json(response)
      .send();
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

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    if (!req.cookies) {
      return res.setStatus(401);
    } // check for cookies, or
  } // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) => {
    console.log(err);
    if (err) {
      return res.setStatus(403);
    }
    req.user = await db.collection("users").findOne({ _id: ObjectId(data.id) });
    next(); // pass the execution off to whatever request the client intended
  });
}

function generateAccessToken(id) {
  // expires after 30 mins
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}
