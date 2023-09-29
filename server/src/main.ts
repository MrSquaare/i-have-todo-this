import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";

import { AppModule } from "./app.module";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT) || 3000;

  const config = new DocumentBuilder()
    .setTitle("I have TODO this")
    .setDescription("The IHTT API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, "Bootstrap");
  Logger.log(`Swagger running on http://localhost:${port}/api`, "Bootstrap");
}
bootstrap();
