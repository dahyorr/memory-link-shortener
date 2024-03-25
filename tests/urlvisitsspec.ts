import assert from "node:assert";
import { beforeEach, describe, it } from "mocha";
import URLVisits from "../src/models/URLVisits";
import { Request } from "express";

let urlVisits: URLVisits;

describe("Test URLStore", () => {

  beforeEach(() => {
    urlVisits = new URLVisits();
  })

  it("Should save visit when logged", () => {
    const randomId = 'random-id'
    const fakeRequest = {
      ip: "127.0.0.1",
      headers: {
        "user-agent": "test-user-agent"
      },
    } as unknown as Request
    urlVisits.logVisit(randomId, fakeRequest);
    const visits = urlVisits.getVisitsByURLId(randomId)

    assert.equal(visits.length, 1);
    assert.equal(visits[0].urlId, randomId);
    assert.equal(visits[0].ip, fakeRequest.ip);
    assert.equal(visits[0].userAgent, fakeRequest.headers["user-agent"]);
  });

})