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
const sgMail = require('@sendgrid/mail');
const fs = require('fs');

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
  //let token = authHeader && authHeader.split(" ")[1];
  let token = req.cookies.token;
  if (token == null) {
    token = req.cookies.token;
  } // if there isn't any token

  const response = {
    error: "",
  };

  response.error = "plain text error";
  if (!token) {
    response.error = "the error is here tho";
    return res.status(403).json(response);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) => {
    console.log(err);
    if (err) {
      response.error = err;
      return res.status(403).json(response);
    }
    const db = client.db();
    req.user = await db.collection("Users").findOne({ _id: ObjectId(data.id) });
    if (req.user) {
      return next();
    }
    response.error = "req.user was not real";
    return res.status(403).json(response);
    // pass the execution off to whatever request the client intended
  });
}

function generateAccessToken(id) {
  // expires after 30 mins
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: "3600s" });
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
    const usernameCheck = await db.collection("Users").findOne({ username });

    if (emailCheck) {
      response.error = "Email already taken";
      res.status(400).json(response);
      return;
    }

    if (usernameCheck) {
      response.error = "Username already taken";
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
        maxAge: 3600000,
        httpOnly: true,
      })
      .json(response);
  })
);

router.use(authenticateToken);

router.post(
  `/logout`,
  wrapAsync(async (req, res, next) => {
    res.clearCookie(`token`);
    res.json();
  })
);

router.post(
  `/addFood`,
  wrapAsync(async (req, res, next) => {
    const fridgeItem = req.body;

    const db = client.db();

    try {
      await db
        .collection("Fridge")
        .updateOne({ userId: req.user._id }, { $push: { fridge: fridgeItem } });
    } catch (e) {
      console.log(e);
      res.send(400).json();
      return;
    }
    res.json();
  })
);

router.post(
  `/loadFridge`,
  wrapAsync(async (req, res, next) => {
    const db = client.db();

    const fridge = await db
      .collection("Fridge")
      .findOne({ userId: req.user._id });

    let response = fridge;
    response._id = "Id not avail";
    response.userId = "userId not avail";

    if (!fridge) {
      res.status(404);
      return;
    }
    res.json(response);
  })
);

router.post(
  `/updatePassword`,
  wrapAsync(async (req, res, next) => {
    const { password, newPassword } = req.body;

    if (!newPassword) {
      res.send(400).json();
      return;
    }
    const db = client.db();

    const response = {
      error: "",
    };

    if (password != req.user.password) {
      response.error =
        "The current password was incorrect. Please enter correct current password.";
      res.status(400).json(response);
      return;
    }

    const passwordCheck = await db
      .collection("Users")
      .findOne({ password: newPassword });

    if (passwordCheck) {
      response.error = "This password is not correct";
      res.status(400).json(response);
      return;
    }

    try {
      await db
        .collection("Users")
        .updateOne({ _id: req.user._id }, { $set: { password: newPassword } });
    } catch (e) {
      console.log(e);
      response.error = e;
      res.status(400).json(response);
      return;
    }
    res.json(response);
  })
);

router.post(
  `/deleteFood`,
  wrapAsync(async (req, res, next) => {
    const item = req.body;

    const response = {
      error: "",
    };

    const db = client.db();

    try {
      await db
        .collection("Fridge")
        .updateOne({ userId: req.user._id }, { $pull: { fridge: { item } } });
    } catch (e) {
      console.log(e);
      response.error = e;
      res.status(400).json(response);
      return;
    }
    res.json(response);
  })
);


router.post(
  '/resetPass',
  wrapAsync(async (req, res, next) => {

    const {email, username} = req.body;

    const response = {
      error: ""
    };

    if (!username) {
      response.error = "No username entered";
      res.status(400).json(response);
      return;
    }

    if (!email) {
      response.error = "No email entered";
      res.status(400).json(response);
      return;
    }

    const db = client.db();
    const user = await db.collection("Users").findOne({username: username, email: email});

    if (!user) {
      response.error = "Account not found with these credentials";
      res.status(400).json(response);
      return;
    }

    const file = fs.readFile(projectRoot + "/server/index.html", "utf-8", (data, err) => {
      if (err) {
        console.log(err);
      }

      // Uncomment for debugging
      else {
        console.log(data);
      }
    });
    const msg = {
       // Only temporary until we get
      // the email domain authenticated.
      // Also, probably should use
      // an environemnt variable here.
      from: "yousefeid707@gmail.com",
      to: email,
      subject: "Password Reset",
      text:`Hello there, ${username}! It seems you've forgotten your FoodBuddy password. If that's you, follow the link`,
      html: file
    };
    
    sgMail.send(msg);

    res.json(response);
  })
);

app.get("*", (req, res) => {
  res.sendFile(projectRoot + "/frontend/build/index.html");
});

app.listen(process.env.PORT || 5000, () => {});

function wrapAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      console.log(error);
      res.status(500).send();
    });
  };
}
