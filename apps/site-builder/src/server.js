import Fastify from 'fastify';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const fastify = Fastify({
  logger: true
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executeChildProcess = (command, args) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Child process exited with code ${code}`));
      }
    });
  });
};


fastify.post('/build', async (request, reply) => {
  const { orgnr, name, template_id } = request.body;

  if (!orgnr || !name || !template_id) {
    reply.status(400).send({ error: 'Missing required fields' });
    return;
  }

  const generateScriptPath = path.resolve(__dirname, 'generate.mjs');
  
  try {
    await executeChildProcess('node', [generateScriptPath, JSON.stringify(request.body)]);
    reply.send({ success: true, message: `Build for ${orgnr} completed.` });
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ success: false, message: `Build for ${orgnr} failed.` });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();