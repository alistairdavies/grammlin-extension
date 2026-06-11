#!/bin/bash

set -e

echo "Fetching OpenAPI schema..."
curl -s https://grammlin-api.fly.dev/openapi.json -o openapi.json

echo "Generating TypeScript API client..."
npx openapi-typescript openapi.json -o ./src/lib/api/grammar_client.d.ts

rm openapi.json
echo "✅ API client generated at src/lib/api"
