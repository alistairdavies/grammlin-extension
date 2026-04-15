import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { beforeAll, afterAll, afterEach, describe, expect, it } from "vitest";
import { createService } from "./service";
import { UnprocessableResponseError, UnexpectedResponseError } from "./errors";
import type { components } from "./grammar_client";

const FAKE_API_URL = "http://somewhere.com";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("parseSentence", () => {
  it("returns serialised tokens for a successful response", async () => {
    const apiResponse: components["schemas"]["AnalyseResponse"] = {
      tokens: [
        {
          text: "Jag",
          lemma: "jag",
          part_of_speech: "pronoun",
          definitions: [
            { translations: ["I"], definition: "first person singular" },
          ],
          morphology: { form: "subject" },
        },
      ],
    };

    server.use(
      http.post(`${FAKE_API_URL}/analyse`, () => {
        return HttpResponse.json(apiResponse);
      }),
    );

    const result = await createService(FAKE_API_URL).parseSentence("Jag");

    expect(result).toEqual([
      {
        text: "Jag",
        lemma: "jag",
        pos: "pronoun",
        definitions: [
          { translations: ["I"], definition: "first person singular" },
        ],
        tags: ["subject"],
      },
    ]);
  });

  it("throws UnprocessableResponseError given a 422 response", async () => {
    server.use(
      http.post(`${FAKE_API_URL}/analyse`, () => {
        return HttpResponse.json(
          { detail: [{ loc: ["body"], msg: "Invalid", type: "value_error" }] },
          { status: 422 },
        );
      }),
    );
    const { parseSentence } = createService(FAKE_API_URL);

    await expect(parseSentence("")).rejects.toThrow(UnprocessableResponseError);
  });

  it("throws UnexpectedResponseError given an unexpected response", async () => {
    server.use(
      http.post(`${FAKE_API_URL}/analyse`, () => {
        return HttpResponse.json(
          { detail: "Internal server error" },
          { status: 500 },
        );
      }),
    );
    const { parseSentence } = createService(FAKE_API_URL);

    await expect(parseSentence("test")).rejects.toThrow(
      UnexpectedResponseError,
    );
  });
});
