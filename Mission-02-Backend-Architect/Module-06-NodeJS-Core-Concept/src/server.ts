import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer((req:IncomingMessage, res: ServerResponse) => {
  // console.log("Request",req);
  // console.log("Respons",res);
  // console.log(req.url);
  // console.log(req.method);
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    // console.log("This is Root Route");
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("This is Root Route")
  } else {
    // console.log("This Route is not defined");
     res.writeHead(404, { "content-type": "text/plain" });
     res.end("This Route is not defined");
  }
})


server.listen(5000, () => {
  console.log("Server is Running.....");
  
})