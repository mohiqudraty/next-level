import type { IncomingMessage } from "http";

export const bodyParser = (req: IncomingMessage): Promise<any> => {
  let body = "";
  return new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      body += chunk.toString("utf-8"); // ← convert Buffer to string explicitly
    });
    req.on("end", () => {
      if (!body) {
        reject(new Error("Empty body"));
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject); // ← prevents crash when stream errors
  });
};
