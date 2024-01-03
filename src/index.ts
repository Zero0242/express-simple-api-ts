import { PORT } from "./config";
import app from "./app";
import { DBConnection } from "./db";

DBConnection()
  .then(() => {
    app.listen(PORT);
    console.log(`App corriendo en ${PORT}`);
  })
  .catch(console.error);
