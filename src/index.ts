import { PORT } from "./config";
import app from "./app";
import { DBConnection } from "./db";

async function bootstrap() {
  app.listen(PORT, () => console.log(`App corriendo en ${PORT}`));
  await DBConnection();
}

bootstrap();
