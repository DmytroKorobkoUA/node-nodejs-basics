import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const gzFilePath = path.join(__dirname, 'files', 'archive.gz');

    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(gzFilePath);
    const gzip = zlib.createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File compressed successfully');
    });

    readStream.on('error', (err) => {
        console.error('Error reading file:', err.message);
    });

    writeStream.on('error', (err) => {
        console.error('Error writing file:', err.message);
    });
};

await compress();
