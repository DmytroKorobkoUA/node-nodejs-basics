import path from 'path';
import { promises as fs } from 'fs';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.mjs';

const random = Math.random();
let unknownObject;

try {
    const filePath = random > 0.5 ? './src/modules/files/a.json' : './src/modules/files/b.json';
    const jsonData = await fs.readFile(path.resolve(filePath), 'utf-8');
    unknownObject = JSON.parse(jsonData);
} catch (error) {
    console.error('Error importing JSON file:', error);
    process.exit(1);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
