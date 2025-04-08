/*----------------------------------------------------------------------------------------------------------------------
 |  TITLE: Are You Sure?
 *--------------------------------------------------------------------------------------------------------------------*/
import * as S from "effect/Schema";
/**
 * @description
 * AYS (stands for "Are you sure?") is a utility type that represents "All Yields" in TypeScript.
 *  "?" and is used to indicate that a certain type
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type AYS = any;

export type AYSPromise = Promise<AYS>;
export type AYSRecordKey = string | number | symbol;
export type AYSRecord = Record<AYSRecordKey, AYS>;
export type AYSFn = (...args: AYS[]) => AYS;
export type AYSPromiseFn = (...args: AYS[]) => AYSPromise;
export type AYSRecordString = Record<string, AYS>;
export type AYSRecordNumber = Record<number, AYS>;
export type AYSRecordSymbol = Record<symbol, AYS>;
export type AYSArray = Array<AYS>;
export type AYSReadonlyArray = ReadonlyArray<AYS>;
export type AYSNonEmptyArray<T extends AYS = AYS> = [T, ...T[]];
export type AYSReadonlyNonEmptyArray<T extends AYS = AYS> = readonly [
  T,
  ...T[],
];

/*----------------------------------------------------------------------------------------------------------------------
 |  TITLE: Effect Types
 *--------------------------------------------------------------------------------------------------------------------*/
export type AYSSchemaWithDeps = S.Schema<AYS, AYS, AYS>;
export type AYSSchemaNoDeps = S.Schema<AYS, AYS, never>;
