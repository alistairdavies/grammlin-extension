import createClient from "openapi-fetch";
import type { paths } from "./grammar_client";
import { UnprocessableResponseError, UnexpectedResponseError } from "./errors";
import { serialiseTokens } from "./serialisers";
import { Token } from "./types";

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_GRAMMAR_API_BASE_URL,
});

export async function parseSentence(sentence: string): Promise<Token[]> {
  const { data, error, response } = await client.POST("/analyse", {
    body: { sentence },
  });

  if (error) {
    if (response.status === 422) {
      throw new UnprocessableResponseError(`Invalid sentence provided.`);
    }

    throw new UnexpectedResponseError(
      `Unexpected ${response.status} response when analyising sentence`,
    );
  }

  return serialiseTokens(data.tokens);
}
