import * as S from "effect/Schema";

export const UserId = S.String.pipe(S.brand("UserId"));
export type UserId = typeof UserId.Type;

export const TodoId = S.String.pipe(S.brand("TodoId"));
export type TodoId = typeof TodoId.Type;
