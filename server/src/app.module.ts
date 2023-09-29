import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodosModule } from "./todos/todos.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      process.env.DATABASE_TYPE === "postgres"
        ? {
            type: "postgres",
            host: process.env.DATABASE_HOST || "localhost",
            port: parseInt(process.env.DATABASE_PORT) || 5432,
            database: process.env.DATABASE_NAME || "postgres",
            username: process.env.DATABASE_USERNAME || "postgres",
            password: process.env.DATABASE_PASSWORD || "postgres",
            autoLoadEntities: true,
            synchronize: true,
          }
        : {
            type: "better-sqlite3",
            database: process.env.DATABASE_FILE || "db.sqlite",
            autoLoadEntities: true,
            synchronize: true,
          },
    ),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
