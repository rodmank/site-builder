// llm/judgelm.js
export async function judgeCopy(copy) {
  console.log(`Judging copy: ${copy.headline}`);
  // Dummy implementation: always pass
  return { fluency: 4.5, originality: 3.8 };
}
