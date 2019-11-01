const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
require("./models/users");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(
    bodyParser.json()
);

app.use(
    cookieSession({
        name: "session",
        maxAge: 30*24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);


const port = process.env.PORT || 5000;
app.listen(port);

console.log("Hello BauBau, keys=", keys);
