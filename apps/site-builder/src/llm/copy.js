// llm/copy.js
export async function draftCopy(orgnr, name, naceCode) {
  console.log(`Drafting copy for ${name} (${orgnr}) with NACE code ${naceCode}`);
  return { headline: "Dummy Headline", body: "This is a dummy body text generated for testing purposes." };
}
