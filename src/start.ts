var express = require("express");

export default function createServer() {
  var app = express();

  app.get("/", (req: any, res: { send: (arg0: string) => any }) =>
    res.send("Service 1")
  );

  return app;
}

var app = createServer();

app.listen(5000, () => {
  console.log("Service 1 is up in port 5000");
});
