import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const gzFilePath = path.join(__dirname, 'files', 'archive.gz');
    const outputPath = path.join(__dirname, 'files', 'fileToCompress.txt');

    const readStream = fs.createReadStream(gzFilePath);
    const writeStream = fs.createWriteStream(outputPath);
    const gunzip = zlib.createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File decompressed successfully');
    });

    readStream.on('error', (err) => {
        console.error('Error reading file:', err.message);
    });

    writeStream.on('error', (err) => {
        console.error('Error writing file:', err.message);
    });
};

await decompress();
