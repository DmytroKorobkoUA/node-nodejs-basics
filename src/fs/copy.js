import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const srcDir = join(__dirname, 'files');
    const destDir = join(__dirname, 'files_copy');

    try {
        await fs.access(srcDir);
        await fs.access(destDir);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.mkdir(destDir);
            const files = await fs.readdir(srcDir);
            for (const file of files) {
                await fs.copyFile(join(srcDir, file), join(destDir, file));
            }
        } else {
            throw error;
        }
    }
};

await copy();
