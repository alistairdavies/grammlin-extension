<script lang="ts">
  import { Bug } from "@lucide/svelte";
</script>

<div class="border-base-300 mt-36 border-t px-6 py-4">
  <div class="mb-4 flex justify-between">
    <h3 class="text-base font-semibold">About</h3>
    <a
      class="link link-primary"
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/alistairdavies/grammlin-extension/issues"
      ><Bug size={14} class="inline" /> Report an issue</a
    >
  </div>

  <h4 class="text-sm">Data Sources</h4>
  <div class="space-y-2">
    <div class="bg-base-200 rounded p-3">
      <h4 class="mb-1 text-xs font-semibold">
        <a
          href="https://folkets-lexikon.csc.kth.se/folkets/om.html"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-primary"
        >
          Folkets Lexikon
        </a>
      </h4>
      <dl class="text-base-content/60 space-y-1 text-xs">
        <div>
          <dt class="inline">Author:</dt>
          <dd class="ml-1 inline">The People (KTH)</dd>
        </div>
        <div>
          <dt class="inline">License:</dt>
          <dd class="ml-1 inline">
            <a
              href="https://creativecommons.org/licenses/by-sa/2.5/"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-primary"
            >
              CC BY-SA 2.5
            </a>
          </dd>
        </div>
      </dl>
    </div>

    <div class="bg-base-200 rounded p-3">
      <h4 class="mb-1 text-xs font-semibold">
        <a
          href="https://spacy.io/models/sv"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-primary"
        >
          spaCy Swedish NLP Model
        </a>
      </h4>
      <dl class="text-base-content/60 space-y-1 text-xs">
        <div>
          <dt class="inline">Author:</dt>
          <dd class="ml-1 inline">
            <a
              href="https://explosion.ai/"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-primary"
            >
              Explosion
            </a>
          </dd>
        </div>
        <div>
          <dt class="inline">License:</dt>
          <dd class="ml-1 inline">
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-primary"
            >
              CC BY-SA 4.0
            </a>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</div>
