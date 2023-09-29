import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("I have TODO this")
    .setDescription("The IHTT API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  await app.listen(3000);

  Logger.log(`Server running on http://localhost:3000`, "Bootstrap");
  Logger.log(`Swagger running on http://localhost:3000/api`, "Bootstrap");
}
bootstrap();
