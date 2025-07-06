# Project: Site-Builder

You are my coding co-pilot on a green-field project called “Site-Builder”.
The goal: build a fully-automatic pipeline that generates and publishes
static Astro websites for every newly-registered Norwegian company.

─────────────────────────────────────────────────────────────
CORE CONCEPTS
─────────────────────────────────────────────────────────────
1. Data source – Brønnøysundregistrene (BRREG) /oppdateringer feed.
   • For each new organisasjonsnummer we get: name, NACE code, address.
2. Build strategy – static first:
   • A Cloud Run service (“site-builder”) fetches LLM copy + SDXL images,
     fills an Astro template, tars a /dist folder, then hands the tarball
     to Cloud Build which rsyncs to gs://sites-bucket/<orgnr>/.
3. Upgrade path – later, founders can pay to migrate to WordPress on
   Cloud Run, but that is **out of scope for v1** of this scaffold.

─────────────────────────────────────────────────────────────
MINIMUM VIABLE ARCHITECTURE (Phase-1)
─────────────────────────────────────────────────────────────
1. Dockerised Node 20 image running:
   • Fastify HTTP server  /build  (POST payload from Cloud Tasks)
   • generate.mjs orchestrator:
       – draft_copy()  → GPT-4o-mini function-call, JSON schema fixed
       – judge_copy()  → local JudgeLM 7B; must pass Fluency ≥4, Orig≥3.5
       – make_tokens() → HSL palette + font pair (Inter, Lexend)
       – astro build   → using one of 8 templates resolved by NACE lookup
2. Folder layout (stick to this, unless we discuss a change):
   apps/site-builder/
     Dockerfile
     package.json
     src/
       server.js
       generate.mjs
       llm/  copy.js, judgelm.js, tokens.js
       utils/ hash.js
     templates/
       construction/   (Layout.astro, components/*)
       generic/        (fallback)
3. External calls (stub ok for now):
   • OpenAI GPT-4o-mini      – env OPENAI_API_KEY
   • JudgeLM endpoint        – env JUDGE_URL
   • Cloud Build inline API  – env PROJECT_ID

─────────────────────────────────────────────────────────────
CODING GUIDELINES & WORKFLOW
─────────────────────────────────────────────────────────────
* **One PR / change set at a time.**  Ask me before touching multiple
  unrelated files.
* For new features:
  1. sketch function signatures & filenames,
  2. write unit tests first (Jest or vitest),
  3. code until tests pass,
  4. run `pnpm lint:fix` before presenting diff.
* For edits, show a unified diff or aider-style patch block:
    ```diff
    --- a/src/generate.mjs
    +++ b/src/generate.mjs
    @@
      const copy = await draftCopy(...)
    - if (fluency < 4) { ... }
    + if (fluency < 4 || originality < 3.5) { ... }
    ```
* Keep container image small (< 200 MB).  Use `--prod` install and Alpine-friendly libs if possible.
* Assume GCP region eu-north1 and Node 20 runtime.

─────────────────────────────────────────────────────────────
FIRST TASK
────────────────────────────────��────────────────────────────
**Implement the Fastify server and the generate.mjs skeleton with
hard-coded dummy copy** (no LLM yet) so that posting this payload …

```json
{
  "orgnr": "000000000",
  "name": "Demo Bygg AS",
  "template_id": "construction"
}
```
… writes a /tmp/build-000000000/dist/index.html file.

After that works, we’ll wire in GPT and JudgeLM. Ask any clarifying
questions you need, or propose a file diff directly.
