import http, { IncomingMessage } from "http";
import fs from "fs"
import path from "path";

const DB_URL = path.join(process.cwd(), "books.json")
// console.log(DB_URL);

const server = http.createServer(async (req: IncomingMessage, res) => {

  const url = req.url;
  const method = req.method;
  // get book ------
  if (url === "/books" && method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json"
    })
    res.end(
      JSON.stringify({
        message: "all books",
      }),
    );
  }

  // res.writeHead(200, {
  //   "content-type": "application/json",
  // });
  // res.end(
  //   JSON.stringify({
  //     data: "Hello vai",
  //   }),
  // );
});

server.listen(3000, () => {
  console.log("server running on .....");
});
