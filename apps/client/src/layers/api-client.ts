import { DomainApi } from "@beep/domain/DomainApi";
import * as FetchHttpClient from "@effect/platform/FetchHttpClient";
import * as HttpApiClient from "@effect/platform/HttpApiClient";
import * as HttpClient from "@effect/platform/HttpClient";
import * as Effect from "effect/Effect";
import { envVars } from "../lib/env-vars";

export class ApiClient extends Effect.Service<ApiClient>()("ApiClient", {
  accessors: true,
  dependencies: [FetchHttpClient.layer],
  effect: HttpApiClient.make(DomainApi, {
    baseUrl: envVars.NEXT_PUBLIC_API_URL.toString(),
    transformClient: (client) =>
      client.pipe(HttpClient.retryTransient({ times: 3 })),
  }),
}) {}
