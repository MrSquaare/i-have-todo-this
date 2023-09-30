// eslint-disable-next-line import/order
import { Logger } from "@nestjs/common";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { dataSourceOptions } from "./constants/datasource";

dotenv.config();

async function seed() {
  const dataSource = new DataSource({
    ...dataSourceOptions,
    entities: ["src/**/*.entity.ts"],
    migrations: ["src/seeds/*.ts"],
  });

  yargs(hideBin(process.argv))
    .command("run", "Run seeds", {}, async () => {
      Logger.log("Connecting to database...", "Seed");
      await dataSource.initialize();
      Logger.log("Running seed migrations...", "Seed");
      await dataSource.runMigrations();
      Logger.log("Seeds run successfully", "Seed");
      await dataSource.destroy();

      process.exit(0);
    })
    .command("revert", "Revert seeds", {}, async () => {
      Logger.log("Connecting to database...", "Seed");
      await dataSource.initialize();
      Logger.log("Reverting seed migrations...", "Seed");
      await dataSource.undoLastMigration();
      Logger.log("Seeds reverted successfully", "Seed");
      await dataSource.destroy();

      process.exit(0);
    })
    .demandCommand()
    .showHelpOnFail(true)
    .parse();
}

seed().catch(console.error);
