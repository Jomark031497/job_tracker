import assert from "node:assert";
import { sum } from "./auth.service";
import { describe, it } from "node:test";

describe("adds 1 + 2 should be equal to 3", () => {
  it("should be equal to 3", () => {
    assert.strictEqual(sum(1, 2), 3);
  });

  it("should kill myself", () => {
    assert.notStrictEqual(1, 1);
  });
});
