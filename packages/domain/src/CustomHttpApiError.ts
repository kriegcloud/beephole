import * as HttpApiSchema from "@effect/platform/HttpApiSchema";
import * as S from "effect/Schema";

// ==========================================
// 4xx Client Errors
// ==========================================

export class BadRequest extends S.TaggedError<BadRequest>("BadRequest")(
  "BadRequest",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 400,
    description: "The request was invalid or cannot be otherwise served",
  }),
) {}

export class Unauthorized extends S.TaggedError<Unauthorized>("Unauthorized")(
  "Unauthorized",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 401,
    description:
      "Authentication is required and has failed or has not been provided",
  }),
) {}

export class PaymentRequired extends S.TaggedError<PaymentRequired>(
  "PaymentRequired",
)(
  "PaymentRequired",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 402,
    description: "Payment is required to proceed",
  }),
) {}

export class Forbidden extends S.TaggedError<Forbidden>("Forbidden")(
  "Forbidden",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 403,
    description:
      "The server understood the request but refuses to authorize it",
  }),
) {}

export class NotFound extends S.TaggedError<NotFound>("NotFound")(
  "NotFound",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 404,
    description: "The requested resource could not be found",
  }),
) {}

export class MethodNotAllowed extends S.TaggedError<MethodNotAllowed>(
  "MethodNotAllowed",
)(
  "MethodNotAllowed",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 405,
    description:
      "The method specified in the request is not allowed for the resource",
  }),
) {}

export class NotAcceptable extends S.TaggedError<NotAcceptable>(
  "NotAcceptable",
)(
  "NotAcceptable",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 406,
    description:
      "The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request",
  }),
) {}

export class ProxyAuthenticationRequired extends S.TaggedError<ProxyAuthenticationRequired>(
  "ProxyAuthenticationRequired",
)(
  "ProxyAuthenticationRequired",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 407,
    description: "The client must first authenticate itself with the proxy",
  }),
) {}

export class RequestTimeout extends S.TaggedError<RequestTimeout>(
  "RequestTimeout",
)(
  "RequestTimeout",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 408,
    description: "The server timed out waiting for the request",
  }),
) {}

export class Conflict extends S.TaggedError<Conflict>("Conflict")(
  "Conflict",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 409,
    description: "The resource already exists",
  }),
) {}

export class Gone extends S.TaggedError<Gone>("Gone")(
  "Gone",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 410,
    description:
      "The requested resource is no longer available and will not be available again",
  }),
) {}

export class LengthRequired extends S.TaggedError<LengthRequired>(
  "LengthRequired",
)(
  "LengthRequired",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 411,
    description:
      "The request did not specify the length of its content, which is required by the requested resource",
  }),
) {}

export class PreconditionFailed extends S.TaggedError<PreconditionFailed>(
  "PreconditionFailed",
)(
  "PreconditionFailed",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 412,
    description:
      "The server does not meet one of the preconditions that the requester put on the request",
  }),
) {}

export class PayloadTooLarge extends S.TaggedError<PayloadTooLarge>(
  "PayloadTooLarge",
)(
  "PayloadTooLarge",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 413,
    description:
      "The request is larger than the server is willing or able to process",
  }),
) {}

export class URITooLong extends S.TaggedError<URITooLong>("URITooLong")(
  "URITooLong",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 414,
    description: "The URI provided was too long for the server to process",
  }),
) {}

export class UnsupportedMediaType extends S.TaggedError<UnsupportedMediaType>(
  "UnsupportedMediaType",
)(
  "UnsupportedMediaType",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 415,
    description:
      "The request entity has a media type which the server or resource does not support",
  }),
) {}

export class RangeNotSatisfiable extends S.TaggedError<RangeNotSatisfiable>(
  "RangeNotSatisfiable",
)(
  "RangeNotSatisfiable",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 416,
    description:
      "The client has asked for a portion of the file, but the server cannot supply that portion",
  }),
) {}

export class ExpectationFailed extends S.TaggedError<ExpectationFailed>(
  "ExpectationFailed",
)(
  "ExpectationFailed",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 417,
    description:
      "The server cannot meet the requirements of the Expect request-header field",
  }),
) {}

export class UnprocessableEntity extends S.TaggedError<UnprocessableEntity>(
  "UnprocessableEntity",
)(
  "UnprocessableEntity",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 422,
    description:
      "The request was well-formed but was unable to be followed due to semantic errors",
  }),
) {}

export class TooEarly extends S.TaggedError<TooEarly>("TooEarly")(
  "TooEarly",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 425,
    description:
      "The server is unwilling to risk processing a request that might be replayed",
  }),
) {}

export class TooManyRequests extends S.TaggedError<TooManyRequests>(
  "TooManyRequests",
)(
  "TooManyRequests",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 429,
    description:
      "The user has sent too many requests in a given amount of time",
  }),
) {}

export class RequestHeaderFieldsTooLarge extends S.TaggedError<RequestHeaderFieldsTooLarge>(
  "RequestHeaderFieldsTooLarge",
)(
  "RequestHeaderFieldsTooLarge",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 431,
    description:
      "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large",
  }),
) {}

export class UnavailableForLegalReasons extends S.TaggedError<UnavailableForLegalReasons>(
  "UnavailableForLegalReasons",
)(
  "UnavailableForLegalReasons",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 451,
    description:
      "The server is denying access to the resource as a consequence of a legal demand",
  }),
) {}

// ==========================================
// 5xx Server Errors
// ==========================================

export class InternalServerError extends S.TaggedError<InternalServerError>(
  "InternalServerError",
)(
  "InternalServerError",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 500,
    description:
      "The server has encountered a situation it doesn't know how to handle",
  }),
) {}

export class NotImplemented extends S.TaggedError<NotImplemented>(
  "NotImplemented",
)(
  "NotImplemented",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 501,
    description:
      "The request method is not supported by the server and cannot be handled",
  }),
) {}

export class BadGateway extends S.TaggedError<BadGateway>("BadGateway")(
  "BadGateway",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 502,
    description:
      "The server, while acting as a gateway or proxy, received an invalid response from the upstream server",
  }),
) {}

export class ServiceUnavailable extends S.TaggedError<ServiceUnavailable>(
  "ServiceUnavailable",
)(
  "ServiceUnavailable",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 503,
    description: "The server is not ready to handle the request",
  }),
) {}

export class GatewayTimeout extends S.TaggedError<GatewayTimeout>(
  "GatewayTimeout",
)(
  "GatewayTimeout",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 504,
    description:
      "The server, while acting as a gateway or proxy, did not get a response in time from the upstream server",
  }),
) {}

export class HTTPVersionNotSupported extends S.TaggedError<HTTPVersionNotSupported>(
  "HTTPVersionNotSupported",
)(
  "HTTPVersionNotSupported",
  {
    message: S.optional(S.String),
  },
  HttpApiSchema.annotations({
    status: 505,
    description:
      "The HTTP version used in the request is not supported by the server",
  }),
) {}
