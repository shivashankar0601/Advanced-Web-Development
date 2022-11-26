const http = require("http");

const port = process.env.PORT || 2000;

const app = require("./app");

const server = http.createServer(app);

server.listen(port, "0.0.0.0", () => {
  console.log(
    "server is running<br /><br />Welcome To CSCI 5709 Tutorial 5<br /><br />The following are the supported API's at the moment<br />GET : http://localhost:2000/api/users<br />GET : http://localhost:2000/api/user/:id<br />PUT : http://localhost:2000/api/update/:id<br />POST : http://localhost:2000/api/add<br />"
  );
});
