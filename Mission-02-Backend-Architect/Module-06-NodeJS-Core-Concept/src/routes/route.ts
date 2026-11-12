import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";

const routeHandler = ((req: IncomingMessage, res: ServerResponse) => {
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
  } else if (url?.startsWith("/products")) {
  productController(req, res)
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This Route is not defined" }));
  }
})


export default routeHandler;