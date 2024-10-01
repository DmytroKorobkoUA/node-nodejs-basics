import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readableStream.on('error', (err) => {
        console.error('Error reading file:', err.message);
    });

    readableStream.on('end', () => {
        console.log('\nFile reading completed.');
    });
};

await read();
