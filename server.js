import app from './app.js'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const scriptPath = path.resolve(process.argv[1] + '.js');
console.log(process.argv[1])
console.log(__filename)
if (scriptPath === __filename) {
  
  app().listen({ port: 3000 }, (err) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
}