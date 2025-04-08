import {
  type FormValidateOrFn,
  type FormValidators,
  formOptions,
} from "@tanstack/react-form";
import * as Array from "effect/Array";
import * as Either from "effect/Either";
import { pipe } from "effect/Function";
import { ArrayFormatter } from "effect/ParseResult";
import * as Schema from "effect/Schema";

type BuildTuple<
  N extends number,
  Acc extends ReadonlyArray<unknown> = [],
> = Acc["length"] extends N ? Acc : BuildTuple<N, [...Acc, unknown]>;

// Computes N - 1 for a number type N.
type Prev<N extends number> = BuildTuple<N> extends [unknown, ...infer Rest]
  ? Rest["length"]
  : 0;

// Recursive type to generate dot-notation paths for a type `Data` up to a depth `Depth`.
type PathsLimited<
  Data,
  Path extends string = "",
  Depth extends number = 3,
> = Depth extends 0 // Base case: Depth limit reached
  ? `${Path}${Path extends "" ? "" : "."}${string}` | Path // Allow the current path or any string suffix.
  : Data extends ReadonlyArray<infer Element>
    ? // For arrays: Generate paths for numeric indices and recurse on the element type.
        | `${Path}${Path extends "" ? "" : "."}${number}`
        | PathsLimited<
            Element,
            `${Path}${Path extends "" ? "" : "."}${number}`,
            Prev<Depth>
          >
    : Data extends object
      ? // For objects: Generate paths for keys and recurse on property types.
        {
          [Key in keyof Data]-?: Key extends string | number
            ?
                | `${Path}${Path extends "" ? "" : "."}${Key}`
                | PathsLimited<
                    Data[Key],
                    `${Path}${Path extends "" ? "" : "."}${Key}`,
                    Prev<Depth>
                  >
            : never;
        }[keyof Data]
      : // Primitive/leaf node: Return the accumulated path.
        Path;

export type Paths<Data> = PathsLimited<Data>;

type RootErrorKey = "";
type SchemaValidatorResult<SchemaInput extends Record<PropertyKey, any>> =
  Partial<Record<Paths<SchemaInput> | RootErrorKey, string>> | null;

type SchemaValidatorFn<SchemaInput extends Record<PropertyKey, any>> =
  (submission: {
    value: SchemaInput;
  }) => SchemaValidatorResult<SchemaInput>;

export const validateWithSchema =
  <A, I extends Record<PropertyKey, any>>(
    schema: Schema.Schema<A, I>,
  ): SchemaValidatorFn<I> =>
  (submission: { value: I }): SchemaValidatorResult<I> =>
    Schema.decodeEither(schema, { errors: "all", onExcessProperty: "ignore" })(
      submission.value,
    ).pipe(
      Either.mapLeft((errors) =>
        pipe(
          errors,
          ArrayFormatter.formatErrorSync,
          Array.reduce({} as Record<string, string>, (acc, error) => {
            if (error.path.length === 0) {
              acc[""] = error.message;
            } else if (error.path.length > 0) {
              const key = error.path.join(".");
              acc[key] = error.message;
            }
            return acc;
          }),
          (acc): SchemaValidatorResult<I> =>
            Object.keys(acc).length > 0 ? acc : null,
        ),
      ),
      Either.flip,
      Either.getOrNull,
    );

type HandledValidatorKey = "onSubmit" | "onChange" | "onBlur";

type SpecificValidators<
  FormData extends Record<PropertyKey, any>,
  Key extends HandledValidatorKey,
  ValidatorFn extends FormValidateOrFn<FormData>,
> = FormValidators<
  FormData,
  undefined, // onMount
  Key extends "onChange" ? ValidatorFn : undefined,
  undefined, // onChangeAsync
  Key extends "onBlur" ? ValidatorFn : undefined,
  undefined, // onBlurAsync
  Key extends "onSubmit" ? ValidatorFn : undefined,
  undefined // onSubmitAsync
>;

export const makeFormOptions = <
  SchemaA,
  SchemaI extends Record<PropertyKey, any>,
  ValidatorKey extends HandledValidatorKey,
>(opts: {
  schema: Schema.Schema<SchemaA, SchemaI>;
  defaultValues: SchemaI;
  validator: ValidatorKey;
}) => {
  const specificValidatorFn = validateWithSchema(opts.schema);

  const validators = ((): SpecificValidators<
    SchemaI,
    ValidatorKey,
    typeof specificValidatorFn
  > => {
    switch (opts.validator) {
      case "onSubmit":
        return { onSubmit: specificValidatorFn } as SpecificValidators<
          SchemaI,
          ValidatorKey,
          typeof specificValidatorFn
        >;
      case "onChange":
        return { onChange: specificValidatorFn } as SpecificValidators<
          SchemaI,
          ValidatorKey,
          typeof specificValidatorFn
        >;
      case "onBlur":
        return { onBlur: specificValidatorFn } as SpecificValidators<
          SchemaI,
          ValidatorKey,
          typeof specificValidatorFn
        >;
      default: {
        const _exhaustiveCheck: never = opts.validator;
        throw new Error(`Unhandled validator key: ${_exhaustiveCheck}`);
      }
    }
  })();

  const options = {
    defaultValues: opts.defaultValues,
    validators,
  };

  return formOptions(options);
};
