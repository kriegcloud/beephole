import * as CustomHttpApiError from "@beep/domain/CustomHttpApiError";
import { UserId } from "@beep/domain/EntityIds";
import { Permission, UserAuthMiddleware } from "@beep/domain/Policy";
import * as HttpServerRequest from "@effect/platform/HttpServerRequest";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as S from "effect/Schema";

const Headers = S.Struct({
	authorization: S.NonEmptyTrimmedString.pipe(
		S.startsWith("Bearer "),
	),
});

const validateTokenFormat = (token: string) =>
	token.length >= 32
		? Effect.succeed(token)
		: Effect.fail(new CustomHttpApiError.Unauthorized());

const verifyToken = (token: string) =>
	Effect.succeed({
		sessionId: "sim_" + token.substring(0, 8),
		userId: "user_" + token.substring(8, 16),
		permissions: new Set([
			"__test:read",
			"__test:manage",
			"__test:delete",
		] satisfies Array<Permission>),
	});

const make = <A, I, R>(schema: S.Schema<A, I, R>) =>
	Effect.sync(() => {
		return Effect.gen(function* () {
			const headers = yield* HttpServerRequest.schemaHeaders(Headers).pipe(
				Effect.mapError(() => new CustomHttpApiError.Unauthorized()),
			);

			const token = headers.authorization.slice(7);

			yield* validateTokenFormat(token);
			const authResponse = yield* verifyToken(token);

			return yield* S.decodeUnknown(schema)(authResponse).pipe(
				Effect.withSpan("decode"),
				Effect.mapError(() => new CustomHttpApiError.Unauthorized()),
			);
		}).pipe(Effect.withSpan("auth.middleware"));
	});

const CurrentUserSchema = S.Struct({
	sessionId: S.String,
	userId: UserId,
	permissions: S.Set(Permission),
});

export const UserAuthMiddlewareLive = Layer.effect(
	UserAuthMiddleware,
	make(CurrentUserSchema),
);
