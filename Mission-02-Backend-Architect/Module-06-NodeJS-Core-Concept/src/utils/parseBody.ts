import type { IncomingMessage } from "http";

export const bodyParser = (req: IncomingMessage): Promise<any> => {
  let body = "";
  return new Promise((resolve, rejects) => {
    req.on("data", (chunk) => {
      // body = body + chunk
      body += chunk;
    });
    req.on("end", () => {
      try {
        // resolve(body)
        resolve(JSON.parse(body))
      } catch (error) {
        rejects(error)
      }
    })
  });
};
