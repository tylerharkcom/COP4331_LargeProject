require("dotenv").config();

const fetch = require("node-fetch");

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
const fs = require("fs");
const sha256 = require("./sha256");
const sgMail = require("@sendgrid/mail");
const { userInfo } = require("os");
// const { ResetPwEmail } = require("../components/EmailVerify");
// const { renderEmail } = require("react-html-email");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

  jwt.verify(token, process.env.LOGIN_TOKEN_SECRET, async (err, data) => {
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
  return jwt.sign(id, process.env.LOGIN_TOKEN_SECRET, { expiresIn: "3600s" });
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

    if (typeof username != "string" || typeof password != "string") {
      // validating data to string
      response.error = "invalid data";
      res.status(400).json(response);
      return;
    }

    await db
      .collection("Users")
      .insertOne({ username, password, confirmed: false, userInfo });
    const user = await db
      .collection("Users")
      .findOne({ username: username, password: password });

    // The async way of sending email.
    // You don't have to wait for the email
    // to be sent for the request to return
    // a response.
    jwt.sign(
      { id: user._id.toHexString() },
      process.env.EMAIL_TOKEN_SECRET,
      { expiresIn: "15m" },
      (err, emailToken) => {
        // DEBUG
        const url = `http://localhost:5000/api/confirmation/emailConf/${emailToken}`;
        // const url = `https://group1largeproject.herokuapp.com/api/confirmation/emailConf/${emailToken}`;

        const text = `A request was sent to confirm your FoodBuddy email as part of your account\
        for registration. To complete your account registration, visit the following link: ${url}`;
        const html = `<h3>A request was sent to confirm your FoodBuddy email as part of your\
        account for registration.<br /></h3><h4>To complete your account registration, visit\
        the following link: <a href="${url}">${url}</a></h4>`;
        // const html2 = renderEmail(<ResetPwEmail emailLink={url} />);

        sgMail.send({
          from: "yousefeid707@gmail.com",
          to: email,
          subject: "FoodBuddy Email Confirmation",
          text,
          html,
        });
      }
    );

    await db.collection("Fridge").insertOne({ userId: user._id });
    res.json(response);
  })
);

router.get(
  "/confirmation/:endpoint/:token",
  wrapAsync(async (req, res) => {
    let response = {
      error: "",
    };

    const { endpoint, token } = req.params;
    console.log("endpoint", endpoint);
    console.log("token", token);
    try {
      const { id } = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
      const db = client.db();

      if (endpoint === "emailConf") {
        await db
          .collection("Users")
          .updateOne({ _id: ObjectId(id) }, { $set: { confirmed: true } });
      }
    } catch (e) {
      console.log(e);
      response.error = "An error has occurred";
      res.status(400).json(response);
      return;
    }

    const emailRedirect = "https://group1largeproject.herokuapp.com/login";

    // Not sure where to redirect this just yet. Might log user in
    // and redirect him straight to Account Information for updatePassword.
    const passRedirect = "https://group1largeproject.herokuapp.com/login";

    // DEBUG for emailConf
    // return res.redirect("http://localhost:5000/login");
    return res.redirect(
      endpoint === "emailConf" ? emailRedirect : passRedirect
    );
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

    let response = {
      fName: "",
      lName: "",
      email: "",
      bDay: "",
      gender: "",
      country: "",
      language: "",
      error: "",
    };

    if (!user) {
      response.error = "No account found.";
      res.status(400).json(response);
      return;
    }

    // Comment this out to disable
    // email confirmation for any
    // other testing.
    if (!user.confirmed) {
      response.error = "Please confirm the \
      email to your account";
      res.status(400).json(response);
      return;
    }

    const token = generateAccessToken({
      id: user._id.toHexString(),
    });

    response = { ...response, ...user.userInfo };

    res
      .status(200)
      .cookie(`token`, token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .json(response);
  })
);

router.post(
  "/resetPass",
  wrapAsync(async (req, res, next) => {
    const { email, username } = req.body;

    const response = {
      error: "",
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
    const user = await db
      .collection("Users")
      .findOne({ username: username, "userInfo.email": email });

    if (!user) {
      response.error = "Account not found with these credentials";
      res.status(400).json(response);
      return;
    }

    jwt.sign(
      { id: user._id.toHexString() },
      process.env.EMAIL_TOKEN_SECRET,
      { expiresIn: "15m" },
      (err, emailToken) => {
        // DEBUG
        // const url = `http://localhost:5000/api/confirmation/passConf/${emailToken}`;
        const url = `https://group1largeproject.herokuapp.com/api/confirmation/passConf/${emailToken}`;
        const text = `A request was sent to reset your FoodBuddy password. If you simply forgot
        your password and want to remember it, your old password is ${user.password}. Otherwise, to reset
        your password entirely, visit the following link:${url}`;
        const html = `<h3>A request was sent to reset your FoodBuddy password. If you simply forgot\
        your password and want to remember it, your old password is ${user.password}.<br /></h3><h4>\
        Otherwise, to reset your password entirely, visit the following link to update your account\
          : <a href="${url}">${url}</a></h4>`;

        sgMail.send({
          from: "yousefeid707@gmail.com",
          to: email,
          subject: "FoodBuddy Password Reset",
          text,
          html,
        });
      }
    );

    res.status(200).json(response);
  })
);

router.get(
  `/getRecipes`,
  wrapAsync(async (req, res) => {
    var resp1 = await fetch(
      "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +
        process.env.SPOON_API_KEY +
        "&ingredients=" +
        req.query.search +
        "&number=2",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    var res1 = JSON.parse(await resp1.text());

    var resp2 = await fetch(
      "https://api.spoonacular.com/recipes/" +
        res1[0].id +
        "/information?apiKey=" +
        process.env.SPOON_API_KEY +
        "&includeNutrition=false",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    var res2 = JSON.parse(await resp2.text());
    var resp3 = await fetch(
      "https://api.spoonacular.com/recipes/" +
        res1[1].id +
        "/information?apiKey=" +
        process.env.SPOON_API_KEY +
        "&includeNutrition=false",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    var res3 = JSON.parse(await resp3.text());

    var response = { results: [res2, res3] };
    if (!response) {
      res.status(400).json();
      return;
    }

    res.status(200).json(response);
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
  `/editFood`,
  wrapAsync(async (req, res, next) => {
    const newItem = req.body;
    const { item } = req.body.item;

    const db = client.db();
    try {
      await db
        .collection("Fridge")
        .updateOne({ userId: req.user._id }, { $pull: { fridge: { item } } });
      await db
        .collection("Fridge")
        .updateOne({ userId: req.user._id }, { $push: { fridge: newItem } });
    } catch (e) {
      console.log(e);
      res.status(400).json();
      return;
    }
    res.json();
  })
);

router.post(
  `/searchFood`,
  wrapAsync(async (req, res, next) => {
    const { item } = req.body;

    const db = client.db();

    const fridge = await db
      .collection("Fridge")
      .findOne({ userId: req.user._id });

    let myFoods = fridge.fridge;

    let searchResults = myFoods.filter(function (foodObject) {
      return foodObject.item.includes(item);
    });
    console.log(searchResults);

    res.json(searchResults);
  })
);

router.post(
  `/loadFridge`,
  wrapAsync(async (req, res, next) => {
    const db = client.db();

    const fridge = await db
      .collection("Fridge")
      .findOne({ userId: req.user._id });

    fridge._id = "Id not avail";
    fridge.userId = "userId not avail";

    if (!fridge) {
      res.status(404);
      return;
    }
    res.json(fridge);
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
  "/updateAccount",
  wrapAsync(async (req, res, next) => {
    const {
      username,
      email,
      fName,
      lName,
      bDay,
      gender,
      country,
      language,
    } = req.body;

    const newInfo = {
      email,
      fName,
      lName,
      bDay,
      gender,
      country,
      language,
    };

    const response = {
      error: "",
    };

    if (!username || !email || !fName || !lName) {
      response.error = "No data entered";
      res.status(400).json(response);
      return;
    }
    const db = client.db();
    var emailCheck, usernameCheck;
    if (email != req.user.email) {
      emailCheck = await db.collection("Users").findOne({ email });
    }
    if (username != req.user.username) {
      usernameCheck = await db.collection("Users").findOne({ username });
    }

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

    try {
      await db
        .collection("Users")
        .updateOne(
          { _id: req.user._id },
          { $set: { userInfo: newInfo, username } }
        );
    } catch (e) {
      console.log(e);
      response.error = e;
      res.status(400).json(response);
      return;
    }

    res.status(200).json(response);
  })
);

router.post(
  `/deleteFood`,
  wrapAsync(async (req, res, next) => {
    const { item } = req.body;

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
  "/deleteAccount",
  wrapAsync(async (req, res, next) => {
    const response = {
      error: "",
    };

    const db = client.db();

    try {
      await db.collection("Users").deleteOne({ _id: req.user._id });
      await db.collection("Fridge").deleteMany({ userId: req.user._id });
    } catch (e) {
      console.log(e);
      response.error = e;
      res.status(400).json(response);
      return;
    }

    response.error = "😱😱😱Account successfully deleted😱😱😱";

    res.status(200).json(response);
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
