process.env.DATABASE_TYPE = "sqlite";
process.env.DATABASE_FILE = ":memory:";

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  // eslint-disable-next-line jest/expect-expect
  it("/todos (GET)", () => {
    return request(app.getHttpServer()).get("/todos").expect(200).expect([]);
  });
});
