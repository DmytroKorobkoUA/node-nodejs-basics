import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fresh.txt');

const create = async () => {
    await fs.writeFile(filePath, 'I am fresh and young', { flag: 'wx' });
    console.log('File created successfully');
};

await create();
