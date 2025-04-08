import * as HttpApiEndpoint from "@effect/platform/HttpApiEndpoint";
import * as HttpApiGroup from "@effect/platform/HttpApiGroup";
import * as HttpApiSchema from "@effect/platform/HttpApiSchema";
import * as S from "effect/Schema";
import { TodoId } from "../EntityIds.js";

export class TodoNotFoundError extends S.TaggedError<TodoNotFoundError>(
  "TodoNotFoundError",
)(
  "TodoNotFoundError",
  {
    message: S.String,
  },
  HttpApiSchema.annotations({
    status: 404,
  }),
) {}

export class Todo extends S.Class<Todo>("Todo")({
  id: TodoId,
  title: S.Trim.pipe(S.nonEmptyString()),
  completed: S.Boolean,
}) {}

export class CreateTodoPayload extends S.Class<CreateTodoPayload>(
  "CreateTodoPayload",
)({
  title: Todo.fields.title,
}) {}

export class UpdateTodoPayload extends S.Class<UpdateTodoPayload>(
  "UpdateTodoPayload",
)({
  id: TodoId,
  title: Todo.fields.title,
  completed: Todo.fields.completed,
}) {}

export class Group extends HttpApiGroup.make("todos")
  .add(HttpApiEndpoint.get("get", "/").addSuccess(S.Array(Todo)))
  .add(
    HttpApiEndpoint.post("create", "/")
      .addSuccess(Todo)
      .setPayload(CreateTodoPayload),
  )
  .add(
    HttpApiEndpoint.put("update", "/:id")
      .addError(TodoNotFoundError)
      .addSuccess(Todo)
      .setPayload(UpdateTodoPayload),
  )
  .add(
    HttpApiEndpoint.del("delete", "/:id")
      .addError(TodoNotFoundError)
      .addSuccess(S.Void)
      .setPayload(TodoId),
  )
  .prefix("/todos") {}
