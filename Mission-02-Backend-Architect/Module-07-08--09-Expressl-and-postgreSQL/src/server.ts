import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
  // ─────────────────────────────────────────────
  // 7. START SERVER
  // ─────────────────────────────────────────────
  // Wait for DB init to finish before accepting requests
  initDB().then(() => {
    app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
    });
  });
};
main()