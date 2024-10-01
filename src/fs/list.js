import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const dirPath = join(__dirname, 'files');

    try {
        await fs.access(dirPath);
        const files = await fs.readdir(dirPath);
        console.log(files);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await list();
