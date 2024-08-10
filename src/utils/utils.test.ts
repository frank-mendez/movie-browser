import { test, describe } from "vitest";
import assert from "assert";
import { hasValidImageExtension, truncateString } from "./utils";

describe("truncateString", () => {
  test("returns the original string if its length is less than the limit", () => {
    const str = "Hello";
    const result = truncateString(str, 10);
    assert.strictEqual(result, str);
  });

  test('returns the truncated string with "..." at the end if its length is more than the limit', () => {
    const str = "Hello, World!";
    const result = truncateString(str, 5);
    assert.strictEqual(result, "Hello...");
  });

  test("returns the original string if its length is equal to the limit", () => {
    const str = "Hello";
    const result = truncateString(str, 5);
    assert.strictEqual(result, str);
  });
});

describe("hasValidImageExtension", () => {
  test("returns true for URLs with good image extensions", () => {
    const url = "https://example.com/image.jpg";
    const result = hasValidImageExtension(url);
    assert.strictEqual(result, true);
  });

  test("returns false for URLs with bad image extensions", () => {
    const url = "https://example.com/image.bad";
    const result = hasValidImageExtension(url);
    assert.strictEqual(result, false);
  });

  test("returns false for URLs without extensions", () => {
    const url = "https://example.com/image";
    const result = hasValidImageExtension(url);
    assert.strictEqual(result, false);
  });
});
