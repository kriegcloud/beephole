import * as Either from "effect/Either";
import { pipe } from "effect/Function";
import { TreeFormatter } from "effect/ParseResult";
import * as Schema from "effect/Schema";

const EnvVars = Schema.Struct({
  NEXT_PUBLIC_API_URL: Schema.URL,
});

export const envVars = pipe(
  {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as unknown,
  } satisfies Record<keyof typeof EnvVars.Encoded, unknown>,
  Schema.decodeUnknownEither(EnvVars),
  Either.getOrElse((parseIssue) => {
    throw new Error(
      `❌ Invalid environment variables: ${TreeFormatter.formatErrorSync(parseIssue)}`,
    );
  }),
);
