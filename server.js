function requireHTTPS(req, res, next) {
  if (!req.secure && req.get("x-forwarded-proto") !== "https") {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}

//Set port
const port = 8080;

const express = require("express");
const app = express();
//Require on deployment.
app.use(requireHTTPS);
app.use(express.static("dist/dotnet-6-crud-api-angular-fe/"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: "dist/dotnet-6-crud-api-angular-fe/" });
});

app.listen(process.env.PORT || 8080);
console.log("Server is listening on port " + port);
