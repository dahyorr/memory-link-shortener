import { isCuid } from "@paralleldrive/cuid2";
import assert from "node:assert";
import URLStore from "../src/lib/URLStore";
import { beforeEach, describe, it } from "mocha";

let urlStore: URLStore;

describe("Test URLStore", () => {

  beforeEach(() => {
    urlStore = new URLStore();
  })

  it("Should store url provided and return an cuid", () => {
    // test implementation
    const testURL = new URL("https://www.test.com");
    const id = urlStore.saveURL(testURL);
    assert.equal(isCuid(id), true);
  });

  it("Should store and return url when provided id", () => {
    // test implementation
    const testURL = new URL("https://www.test.com");
    const id = urlStore.saveURL(testURL);

    const url = urlStore.getURL(id)

    assert.equal(url.toString(), testURL.toString());
  });

  it("Should throw an error when invalid error is provided", () => {
    const invalidId = "obviously-an-invalid-id"
    assert.throws(() => urlStore.getURL(invalidId), new Error("URL not found"))
  })

  it("Should throw an error when invalid error is provided", () => {
    const invalidId = "obviously-an-invalid-id"
    assert.throws(() => urlStore.getURL(invalidId), new Error("URL not found"))
  })

  it("Should increment hit counter when url is retrieved", () => {
    const testURL = new URL("https://www.test.com");
    const id = urlStore.saveURL(testURL);
    // retrieve url 3 times
    urlStore.getURL(id)
    urlStore.getURL(id)
    urlStore.getURL(id)

    const stats = urlStore.getStats(id)
    assert.equal(stats.hits, 3)
  })
})