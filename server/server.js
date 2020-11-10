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

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
<<<<<<< HEAD
    if (!req.cookies) {
      return res.status(401).send();
    }
    token = req.cookies.token;
=======
    return res.status(401);
>>>>>>> 3c713ba8f47f0d20c5a8ac072a084a506b7eb149
  } // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) => {
    //console.log(err);
    if (err) {
<<<<<<< HEAD
      return res.status(403).send();
=======
      return res.status(403);
>>>>>>> 3c713ba8f47f0d20c5a8ac072a084a506b7eb149
    }
    const db = client.db();
    req.user = await db.collection("Users").findOne({ _id: data.id });
    next(); // pass the execution off to whatever request the client intended
  });
}

function generateAccessToken(id) {
  // expires after 30 mins
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

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

    const emailCheck = await db.collection("Users").findOne({ email });

    if (email) {
      response.error = "Email already taken";
      res.status(400).json(response);
      return;
    }

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
    const user = await db
      .collection("Users")
      .findOne({ username: username, password: password });
    await db.collection("Fridge").insertOne({ userId: user._id });

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
      email: "",
      error: "",
    };

    if (!user) {
      response.error = "No account found.";
      res.status(400).json(response);
      return;
    }

    const token = generateAccessToken({
      id: user._id.toHexString(),
    });

    response.fName = user.userInfo.fName;
    response.lName = user.userInfo.lName;
    response.email = user.userInfo.email;

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

app.post(
  `/api/logout`,
  wrapAsync((req, res, next) => {
    req.cookies.token = ``;
    res.status(200).send();
  })
);

app.post(
  `/api/addFood`,
  wrapAsync((req, res, next) => {
    const fridgeItem = req.body;

    const db = client.db();

    db.collection("Fridge").updateOne(
      { userId: req.user },
      { $push: { fridge: fridgeItem } }
    );

    res.status(200).send();
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
