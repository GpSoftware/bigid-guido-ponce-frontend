import { ZodError, ZodSchema } from "zod";

type ValidationResponse =
  | {
      success: true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result: any;
    }
  | {
      success: false;
      errors: string[];
    };

export function validateRequest(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: any,
  schema: ZodSchema
): ValidationResponse {
  try {
    const result = schema.parse(request);

    return {
      success: true,
      result,
    };
  } catch (error: unknown) {
    const zodError = error as ZodError;
    console.debug(zodError.issues);
    return {
      success: false,
      errors: zodError.issues.map((issue) => issue.message + " \n"),
    };
  }
}
