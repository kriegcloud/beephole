import { DomainApi } from "@beep/domain/DomainApi";
import * as HttpApi from "@effect/platform/HttpApi";

export const Api = HttpApi.make("api").addHttpApi(DomainApi);
