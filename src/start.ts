var express = require("express");
const { networkInterfaces } = require("os");
const nets = networkInterfaces();
function getNetworks(): any {
  const results = Object.create(null); // or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }

        results[name].push(net.address);
      }
    }
  }
  return results;
}
export default function createServer() {
  var app = express();

  app.get("/", (req: any, res: { send: (arg0: string) => any }) =>
    res.send("Service 1 - Update 2")
  );

  app.get("/networks", (req: any, res: { send: (arg0: string) => any }) =>
    res.send(getNetworks())
  );

  return app;
}

var app = createServer();

app.listen(5000, () => {
  console.log("Service 1 is up in port 5000");
});
