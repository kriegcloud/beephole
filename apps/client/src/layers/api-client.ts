import { DomainApi } from "@beep/domain/DomainApi";
import * as FetchHttpClient from "@effect/platform/FetchHttpClient";
import * as HttpApiClient from "@effect/platform/HttpApiClient";
import * as HttpClient from "@effect/platform/HttpClient";
import * as Effect from "effect/Effect";

import { config as dotenv } from "dotenv";

dotenv({
  path: "../../.env",
});

export class ApiClient extends Effect.Service<ApiClient>()("ApiClient", {
  accessors: true,
  dependencies: [FetchHttpClient.layer],
  effect: HttpApiClient.make(DomainApi, {
    baseUrl: "http://localhost:3000",
    transformClient: (client) =>
      client.pipe(HttpClient.retryTransient({ times: 3 })),
  }),
}) {}
