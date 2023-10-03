const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const {
  createUser,
  findUserByUsername,
  findUserByApiKey,
} = require("./data/users");
const { isAdmin } = require("./middleware/authMiddleware");

app.use(bodyParser.json());

passport.use(
  new BearerStrategy((token, done) => {
    const user = findUserByApiKey(token);
    if (!user) {
      return done(null, false);
    }
    return done(null, user, { scope: "all" });
  })
);

const itemsRouter = require("./routes/items");
app.use(
  "/items",
  passport.authenticate("bearer", { session: false }),
  itemsRouter
);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
