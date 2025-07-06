import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generate() {
  const payload = JSON.parse(process.argv[2]);
  const { orgnr, name, template_id } = payload;

  const buildDir = path.join(__dirname, '..', `build-${orgnr}`);
  const distDir = path.join(buildDir, 'dist');

  try {
    await fs.mkdir(buildDir, { recursive: true });

    const templateDir = path.resolve(__dirname, '..', 'templates', template_id);
    const astroConfig = path.resolve(__dirname, '..', 'astro.config.mjs');
    
    // Create a dummy index.astro to be built
    const pagesDir = path.join(buildDir, 'src', 'pages');
    await fs.mkdir(pagesDir, { recursive: true });
    const dummyIndexContent = `---
import Layout from '../../../templates/${template_id}/Layout.astro';
---
<Layout>
  <h1>${name}</h1>
  <p>Welcome to the website of ${name}.</p>
  <p>This is a dummy page for organization number ${orgnr}.</p>
</Layout>
`;
    await fs.writeFile(path.join(pagesDir, 'index.astro'), dummyIndexContent);

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
