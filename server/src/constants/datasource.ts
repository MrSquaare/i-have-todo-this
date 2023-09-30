import { DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions =
  process.env.DATABASE_TYPE === "postgres"
    ? {
        type: "postgres",
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT) || 5432,
        database: process.env.DATABASE_NAME || "postgres",
        username: process.env.DATABASE_USERNAME || "postgres",
        password: process.env.DATABASE_PASSWORD || "postgres",
        synchronize: true,
      }
    : {
        type: "better-sqlite3",
        database: process.env.DATABASE_FILE || "db.sqlite",
        synchronize: true,
      };
