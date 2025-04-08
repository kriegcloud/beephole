import { strictEqual } from "node:assert";
import { describe, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as TestClock from "effect/TestClock";
import * as ManualCache from "../src/ManualCache.js";

describe("ManualCache", () => {
  it.scoped("should handle basic set and get operations", () =>
    Effect.gen(function* () {
      const cache = yield* ManualCache.make<string, string>({
        capacity: 100,
        timeToLive: "1 hour",
      });

      yield* cache.set("key", "value");
      const value = yield* cache.get("key");

      strictEqual(value._tag, "Some");
      strictEqual(value.value, "value");
    }),
  );

  it.scoped("should respect TTL and expire items", () =>
    Effect.gen(function* () {
      const cache = yield* ManualCache.make<string, string>({
        capacity: 100,
        timeToLive: "1 second",
      });

      yield* cache.set("key", "value");
      yield* TestClock.adjust("2 seconds");
      const value = yield* cache.get("key");

      strictEqual(value._tag, "None");
    }),
  );

  it.scoped("should respect capacity limits", () =>
    Effect.gen(function* () {
      const cache = yield* ManualCache.make<string, string>({
        capacity: 2,
        timeToLive: "1 hour",
      });

      yield* cache.set("key1", "value1");
      yield* cache.set("key2", "value2");
      yield* cache.set("key3", "value3");
      yield* cache.set("key4", "value4");
      yield* cache.set("key5", "value5");

      const size = yield* cache.size;
      const key1Value = yield* cache.get("key1");
      const key2Value = yield* cache.get("key2");
      const key3Value = yield* cache.get("key3");
      const key4Value = yield* cache.get("key4");
      const key5Value = yield* cache.get("key5");

      strictEqual(size, 2);
      strictEqual(key1Value._tag, "None");
      strictEqual(key2Value._tag, "None");
      strictEqual(key3Value._tag, "None");
      strictEqual(key4Value._tag, "Some");
      strictEqual(key5Value._tag, "Some");
    }),
  );

  it.scoped("should handle invalidation correctly", () =>
    Effect.gen(function* () {
      const cache = yield* ManualCache.make<string, string>({
        capacity: 100,
        timeToLive: "1 hour",
      });

      yield* cache.set("key", "value");
      yield* cache.invalidate("key");
      const value = yield* cache.get("key");

      strictEqual(value._tag, "None");
    }),
  );

  it.scoped("should handle invalidateAll correctly", () =>
    Effect.gen(function* () {
      const cache = yield* ManualCache.make<string, string>({
        capacity: 100,
        timeToLive: "1 hour",
      });

      yield* cache.set("key1", "value1");
      yield* cache.set("key2", "value2");
      yield* cache.invalidateAll;

      const size = yield* cache.size;
      strictEqual(size, 0);
    }),
  );

  it.scoped("should correctly track contains status", () =>
    Effect.gen(function* () {
      const cache = yield* ManualCache.make<string, string>({
        capacity: 100,
        timeToLive: "1 hour",
      });

      yield* cache.set("key", "value");
      const exists = yield* cache.contains("key");
      yield* cache.invalidate("key");
      const notExists = yield* cache.contains("key");

      strictEqual(exists, true);
      strictEqual(notExists, false);
    }),
  );

  it.scoped("should handle keys, values, and entries correctly", () =>
    Effect.gen(function* () {
      const cache = yield* ManualCache.make<string, string>({
        capacity: 100,
        timeToLive: "1 hour",
      });

      yield* cache.set("key1", "value1");
      yield* cache.set("key2", "value2");

      const keys = yield* cache.keys;
      const values = yield* cache.values;
      const entries = yield* cache.entries;

      strictEqual(keys.length, 2);
      strictEqual(values.length, 2);
      strictEqual(entries.length, 2);
      strictEqual(entries[0]?.[0], "key1");
      strictEqual(entries[0]?.[1], "value1");
      strictEqual(entries[1]?.[0], "key2");
      strictEqual(entries[1]?.[1], "value2");
    }),
  );

  it.scoped("should periodically evict items based on TTL", () =>
    Effect.gen(function* () {
      const cache = yield* ManualCache.make<string, string>({
        capacity: 100,
        timeToLive: "15 seconds",
      });

      yield* cache.set("key1", "value1");
      yield* cache.set("key2", "value2");

      const initialSize = yield* cache.size;
      strictEqual(initialSize, 2);

      // items should still be present
      yield* TestClock.adjust("5 seconds");
      const midSize = yield* cache.size;
      strictEqual(midSize, 2);

      // items should be automatically evicted
      yield* TestClock.adjust("31 seconds");
      yield* Effect.yieldNow();

      const finalSize = yield* cache.size;
      const key1Value = yield* cache.get("key1");
      const key2Value = yield* cache.get("key2");

      strictEqual(finalSize, 0);
      strictEqual(key1Value._tag, "None");
      strictEqual(key2Value._tag, "None");
    }),
  );
});
