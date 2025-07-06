import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { draftCopy } from './llm/copy.js';
import { judgeCopy } from './llm/judgelm.js';
import { makeTokens } from './llm/tokens.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generate() {
  const payload = JSON.parse(process.argv[2]);
  const { orgnr, name, template_id, naceCode } = payload;

  const buildDir = path.join(__dirname, '..', `build-${orgnr}`);
  const distDir = path.join(buildDir, 'dist');

  try {
    await fs.mkdir(buildDir, { recursive: true });

    const copy = await draftCopy(orgnr, name, naceCode);
    const { fluency, originality } = await judgeCopy(copy);
    const { palette, fontPair } = await makeTokens();

    if (fluency < 4 || originality < 3.5) {
      console.error('Copy did not pass quality checks.');
      process.exit(1);
    }

    const templateDir = path.resolve(__dirname, '..', 'templates', template_id);
    const astroConfig = path.resolve(__dirname, '..', 'astro.config.mjs');
    
    // Create a dummy index.astro to be built
    const pagesDir = path.join(buildDir, 'src', 'pages');
    await fs.mkdir(pagesDir, { recursive: true });
    const indexContent = `---
import Layout from '../../../templates/${template_id}/Layout.astro';
---
<Layout>
  <h1 style="color: ${palette.split(',')[0]}; font-family: ${fontPair.split(',')[0]};">${copy.headline}</h1>
  <p>${copy.body}</p>
  <p>Generated for organization number ${orgnr}.</p>
  <p>Fluency: ${fluency}, Originality: ${originality}</p>
</Layout>
`;
    await fs.writeFile(path.join(pagesDir, 'index.astro'), indexContent);

    // Copy the template files to the build directory
    await fs.cp(templateDir, path.join(buildDir, 'templates', template_id), { recursive: true });


    const astroBuildCommand = `npx astro build --root ${buildDir} --out-dir ${distDir}`;

    const execution = () => new Promise((resolve, reject) => {
      exec(astroBuildCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return reject(error);
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      });
    });

    await execution();

    console.log(`Successfully built site for ${orgnr} in ${distDir}`);

  } catch (error) {
    console.error('Failed to generate site:', error);
    process.exit(1);
  }
}

generate();
