import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    const writableStream = fs.createWriteStream(filePath);

    process.stdin.on('data', (chunk) => {
        writableStream.write(chunk);
    });

    writableStream.on('error', (err) => {
        console.error('Error writing to file:', err.message);
    });
};

await write();
