import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

import { ValidationPipe } from "./validation.pipe";

describe("ValidationPipe", () => {
  describe("createExceptionFactory", () => {
    it("should return a function", () => {
      const pipe = new ValidationPipe();

      const got = pipe.createExceptionFactory();

      expect(typeof got).toBe("function");
    });

    it("should return a function that returns a BadRequestException", () => {
      const pipe = new ValidationPipe();

      const got = pipe.createExceptionFactory();

      expect(got()).toBeInstanceOf(BadRequestException);
    });

    it("should return a function that returns a BadRequestException with validation errors", () => {
      const pipe = new ValidationPipe();

      const got = pipe.createExceptionFactory();

      const validationError = new ValidationError();

      validationError.property = "property";

      const validationErrors = [validationError];

      const gotException = got(validationErrors);

      expect(gotException).toBeInstanceOf(BadRequestException);
      expect(gotException).toHaveProperty("response.message", validationErrors);
    });

    it("should return a function that returns a BadRequestException with generic message", () => {
      const pipe = new ValidationPipe({
        disableErrorMessages: true,
      });

      const got = pipe.createExceptionFactory();

      const validationError = new ValidationError();

      validationError.property = "property";

      const validationErrors = [validationError];

      const gotException = got(validationErrors);

      expect(gotException).toBeInstanceOf(BadRequestException);
      expect(gotException).toHaveProperty(
        "response.message",
        expect.any(String),
      );
    });
  });
});
