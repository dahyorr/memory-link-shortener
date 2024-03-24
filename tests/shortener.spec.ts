import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";
import request from "supertest";
import app from "../src/main";
import { urlStore } from "../src/lib/URLStore";
import { isCuid } from "@paralleldrive/cuid2";

describe("POST /encode", () => {
  const inputUrl = new URL("https://www.test.com");

  beforeEach(() => {
    urlStore.reset()
  })

  it("Should return 400 error when invalid url or request body is provided", async () => {
    await request(app)
      .post("/encode")
      .send({ url: "invalid-url" }) // invalid url
      .expect('Content-Type', /json/)
      .expect(400);

    await request(app)
      .post("/encode")
      .send({ url: "" }) // empty url
      .expect('Content-Type', /json/)
      .expect(400);

    await request(app)
      .post("/encode") // empty body
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it("Should return shortURL when a valid url is provided", async (done) => {
    await request(app)
      .post("/encode")
      .send({ url: inputUrl })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        let shortUrl: URL;
        try {
          shortUrl = new URL(res.body.data.shortURL);
        }
        catch (err) {
          assert.fail(err)
        }
        const id = shortUrl.toString().split("/").pop() || "";
        assert.equal(isCuid(id), true);
        assert.notEqual(inputUrl.toString(), shortUrl.toString());
      },)
  });

  it("Should return valid shortURl", async () => {
    const response = await request(app)
      .post("/encode")
      .send({ url: inputUrl })
      .expect('Content-Type', /json/)
      .expect(200)
    const shortURL = response.body.data.shortURL;
    const id = shortURL.split("/").pop();
    let url: URL;
    try {
      url = urlStore.getURL(id);
    }
    catch (err) {
      assert.fail(err)
    }
    assert.equal(url.toString(), inputUrl.toString())
  });
})

describe("POST /decode", () => {
  const inputUrl = new URL("https://www.test.com");

  beforeEach(() => {
    urlStore.reset()
  })

  it("Should return 400 error when invalid url or request body is provided", async () => {
    await request(app)
      .post("/decode")
      .send({ url: "invalid-url" }) //  invalid url
      .expect('Content-Type', /json/)
      .expect(400);

    await request(app)
      .post("/decode")
      .send({ url: "" }) // empty url
      .expect('Content-Type', /json/)
      .expect(400);

    await request(app)
      .post("/decode")  // empty body
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it("Should return inputUrl when a valid shortURL is provided", async (done) => {
    const id = urlStore.saveURL(inputUrl)
    const { url } = request(app).get("/")

    await request(app)
      .post("/decode")
      .send({ url: new URL(id, url).toString() })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        assert.equal(inputUrl.toString(), res.body.data.url); //
      },)
  });
})

describe("GET /statistic/:id", () => {
  const inputUrl = new URL("https://www.test.com");

  beforeEach(() => {
    urlStore.reset()
  })

  it("Should return 404 when invalid id is provided", async () => {
    const randomId = "random-id";
    await request(app)
      .get(`/statistic/${randomId}`)
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it("Should return accurate stats object when a valid id is provided", async (done) => {
    const id = urlStore.saveURL(inputUrl)
    urlStore.getURL(id) // just to increment hits
    urlStore.getURL(id)
    urlStore.getURL(id)
    await request(app)
      .get(`/statistic/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        assert.deepEqual(res.body.data, urlStore.getStats(id)); //
      },)
  });
})

describe("GET /:id", () => {
  const inputUrl = new URL("https://www.test.com");

  beforeEach(() => {
    urlStore.reset()
  })

  it("Should return 404 when invalid id is provided", async () => {
    const randomId = "random-id";
    await request(app)
      .get(`/${randomId}`)
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it("Should redirect to input url if id is valid", async (done) => {
    const id = urlStore.saveURL(inputUrl)
    urlStore.getURL(id)
    await request(app)
      .get(`/${id}`)
      .expect(302)
      .expect('Location', inputUrl.toString())
  });
})