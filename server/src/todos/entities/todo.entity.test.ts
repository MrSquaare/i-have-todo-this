import { TodoState } from "@common/types";
import { ArgumentMetadata, BadRequestException } from "@nestjs/common";

import { ValidationPipe } from "../../pipes/validation.pipe";

import { Todo } from "./todo.entity";

describe("TodoEntity", () => {
  describe("validation", () => {
    it("should return value if valid", async () => {
      const pipe = new ValidationPipe({
        disableErrorMessages: true,
      });

      const value = new Todo();

      Object.assign(value, {
        id: "70b65a63-94a6-44ce-b551-fd92c83fe192",
        created_at: "2023-01-01T00:00:00.000Z",
        title: "Todo",
        description: "Todo description",
        state: TodoState.TODO,
      });

      const metadata: ArgumentMetadata = {
        type: "param",
        metatype: Todo,
        data: "",
      };
      const got = await pipe.transform(value, metadata);

      expect(got).toBe(value);
    });

    it("should throw bad request exception", async () => {
      const pipe = new ValidationPipe({
        disableErrorMessages: true,
      });

      const value = {
        id: "1",
        created_at: "10 January 2021",
        title: "",
        description: 123,
        state: "todo",
      };

      const metadata: ArgumentMetadata = {
        type: "param",
        metatype: Todo,
        data: "",
      };

      await expect(pipe.transform(value, metadata)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it("should throw bad request exception with error messages", async () => {
      const pipe = new ValidationPipe();

      const value = {
        id: "1",
        created_at: "10 January 2021",
        title: "",
        description: 123,
        state: "todo",
      };

      const metadata: ArgumentMetadata = {
        type: "param",
        metatype: Todo,
        data: "",
      };

      await expect(pipe.transform(value, metadata)).rejects.toHaveProperty(
        "response.message",
        expect.arrayContaining([
          expect.objectContaining({
            property: "title",
            constraints: {
              isNotEmpty: expect.any(String),
            },
          }),
          expect.objectContaining({
            property: "description",
            constraints: {
              isString: expect.any(String),
            },
          }),
          expect.objectContaining({
            property: "state",
            constraints: {
              isEnum: expect.any(String),
            },
          }),
          expect.objectContaining({
            property: "id",
            constraints: {
              isUuid: expect.any(String),
            },
          }),
          expect.objectContaining({
            property: "created_at",
            constraints: {
              isDateString: expect.any(String),
            },
          }),
        ]),
      );
    });
  });
});
