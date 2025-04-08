import * as HttpApi from "@effect/platform/HttpApi";
import * as TodosContract from "./api/TodosContract";

export class DomainApi extends HttpApi.make("domain").add(
  TodosContract.Group,
) {}
