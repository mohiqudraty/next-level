import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";

const server: Server = createServer((req:IncomingMessage, res: ServerResponse) => {
  // console.log("Request",req);
  // console.log("Respons",res);
  // console.log(req.url);
  // console.log(req.method);
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    // console.log("This is Root Route");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is Root Route" }));
  }else if (url?.startsWith("/products")) {
     res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is Products route" }));
  } else {
    res.writeHead(404, { "content-type": "application/json" });
     res.end(JSON.stringify({ message: "This Route is not defined" }));
  }
})


server.listen(5000, () => {
  console.log("Server is Running.....");
  
})