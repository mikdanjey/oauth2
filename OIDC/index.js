const express = require("express");
const { Provider } = require("oidc-provider");
const path = require("path");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//Middlewares
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const configuration = {
  clients: [
    {
      client_id: process.env.ClientId,
      client_secret: process.env.ClientSecret,
      grant_types: ["authorization_code"],
      redirect_uris: ["http://localhost:8080/auth/login/callback"],
      response_types: ["code"],
      //other configurations if needed
    },
  ],
  pkce: {
    required: () => false,
  },
};

const oidc = new Provider("http://localhost:8000", configuration);

app.use("/oidc", oidc.callback());

app.listen(8000, function () {
  console.log('oidc-provider listening on port 8000, check http://localhost:8000/.well-known/openid-configuration');
});
