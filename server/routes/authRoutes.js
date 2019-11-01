const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (res, req) => {
      console.log("/auth/google/callback, res=", res.user);
    }
  );

  app.get("/api/current_user", (req, res) => {
    console.log("/api/current_user req=", req.user);
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    console.log("/api/logout req=", req.user);
      req.logout();
  }
  )
};
