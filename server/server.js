require("dotenv").config();

const projectRoot = process.cwd();

const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb").ObjectId;

const client = new MongoClient(process.env.MONGO_URI);
client.connect();

const express = require("express");
const bodyparser = require(`body-parser`);
const jwt = require(`jsonwebtoken`);
const cookieParser = require(`cookie-parser`);
const cors = require(`cors`);
const { Router } = require("express");

const app = express();
const router = Router();

app.use(express.static(`static`));
app.use(`/api`, router);
app.use(express.static(`frontend/build`));

router.use(cors());
router.use(bodyparser.json());
router.use(cookieParser());

router.use((req, res, next) => {
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
    token = req.cookies.token;
  } // if there isn't any token

  if (!token) {
    return res.status(403).send();
  }

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) => {
    console.log(err);
    if (err) {
      return res.status(403).send();
    }
    const db = client.db();
    req.user = await db.collection("Users").findOne({ _id: ObjectId(data.id) });
    if (req.user) {
      return next();
    }
    return res.status(403).send();
    // pass the execution off to whatever request the client intended
  });
}

function generateAccessToken(id) {
  // expires after 30 mins
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

router.post(
  `/register`,
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

router.post(
  `/login`,
  wrapAsync(async (req, res) => {
    console.log(process.cwd() + `/frontend/build/index.html`);
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
      .json(response);
  })
);

router.use(authenticateToken);

router.post(
  `/logout`,
  wrapAsync(async (req, res, next) => {
    req.cookies.token = ``;
    res.status(200).send();
  })
);

router.post(
  `/addFood`,
  wrapAsync(async (req, res, next) => {
    const fridgeItem = req.body;

    const db = client.db();
    const success = await db
      .collection("Fridge")
      .updateOne({ userId: req.user._id }, { $push: { fridge: fridgeItem } });
    res.status(200).json();
  })
);

app.get("*", (req, res) => res.sendFile("frontend/public/index.html"));
app.listen(process.env.PORT || 5000, () => {});

function wrapAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      console.log(error);
      res.status(500).send();
    });
  };
}
